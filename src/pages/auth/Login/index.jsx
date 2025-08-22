import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../../assets/images/tvs-lucas-logo.png";
import { handleSesssionStorage } from "../../../utils/helperFunction";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormikTextField from "../../../componenets/common/Fields/formikTextField";
import { LoginApi } from "../../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/slice/authSlice";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { loginDetail } = useSelector(authSelector)
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            // Role: "",
            Username: "",
            password: "",
            remember: false,
        },
        validationSchema: Yup.object({
            Username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            const payload = {
                username: values.Username,
                password: values.password,
            };
            dispatch(LoginApi(payload));
        },
    });

    useEffect(() => {
        const token = loginDetail?.data?.token;
        const Username = loginDetail?.data?.user?.name
        const user = loginDetail?.data?.user;
        handleSesssionStorage("add", "token", token);
        handleSesssionStorage("add", "name", Username);
        handleSesssionStorage("add", "user", JSON.stringify(user));
        const userRole = loginDetail?.data?.user?.role;

        if (!token || !userRole) return;

        const role = userRole.toLowerCase();
        const roleNumber = role === "admin" ? 1 : role === "manager" ? 2 : 3;

        handleSesssionStorage("add", "ur", roleNumber);

        const roleRouteMap = {
            admin: "/adminDashboard/home",
            manager: "/managerDashboard/home",
            user: "/userDashboard/home",
        };

        const targetPath = roleRouteMap[role];

        navigate(targetPath);
    }, [loginDetail, navigate]);

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div>
            <div className="bgLogin" style={{ position: "relative", height: "100vh" }}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "44px",
                                    color: "#ffffffff",
                                    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
                                    fontWeight: "bold",
                                    textTransform:"uppercase"
                                }}
                            >
                                PED - Project Tracker
                            </h2>
                        </div>

                        {/* Login Form */}
                        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: "100%" }}>
                            <div style={{ textAlign: "center" }}>
                                <img src={Logo} alt="TVS Lucas Logo" />
                            </div>
                            <br />
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                                onSubmit={formik.handleSubmit}
                            >
                                {/* <FormikDropdown label="Role" name="Role" options={RoleOptions} formik={formik} /> */}
                                <FormikTextField
                                    formik={formik}
                                    name="Username"
                                    label="Username"
                                    type="text"
                                    required
                                    error={formik.touched.Username && Boolean(formik.errors.Username)}
                                    helperText={formik.touched.Username && formik.errors.Username}
                                />
                                <TextField
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="normal"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box display="flex" justifyContent="space-between">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="remember"
                                                color="primary"
                                                checked={formik.values.remember}
                                                onChange={formik.handleChange}
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ cursor: "pointer", color: "primary.main" }}
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"

                                    sx={{ mt: 3, mb: 2, backgroundColor: "#00796b" }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </div>
        </div>
    )
}

export default Login