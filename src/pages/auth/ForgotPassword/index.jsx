import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ForgotPasswordApi } from "../../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../redux/slice/authSlice";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { forgotPassDetail } = useSelector(authSelector)
    const [formData, setFormData] = useState({
        email: "",
        ccNo: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.ccNo) {
            newErrors.ccNo = "CC No is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            cc_no: formData.ccNo,
            mailid: formData.email,
            new_password: formData.password,
        };
        dispatch(ForgotPasswordApi(payload));
        navigate("/")
    };
    
    useEffect(() => {
        if (forgotPassDetail?.status === true) {
            navigate("/");
        }
    }, [forgotPassDetail?.status, navigate]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            className="bgLogin"
        >
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h5" mb={3} align="center" fontWeight={600}>
                    Reset Password
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="CC No"
                        name="ccNo"
                        fullWidth
                        margin="normal"
                        value={formData.ccNo}
                        onChange={handleChange}
                        error={!!errors.ccNo}
                        helperText={errors.ccNo}
                    />

                    <TextField
                        label="New Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2, backgroundColor: "#00796b", color: "White" }}
                    >
                        Reset Password
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
