import {
    Box,
    Button,
    CardHeader,
    MenuItem,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import FormikTextField from "../Fields/formikTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getManagerTeamMemberListApi, managerAddUserApi } from "../../../redux/action/managerAction";


const ManagerAddNewEmployeeModal = ({ openModal, setOpenModal }) => {

    const dispatch = useDispatch();

    const departments = ["Alternator", "Starter", "Wiper", "Process Development - MFG", "Process Development - Assembly and AI"];
    // const roles = ["manager", "user"];

    const teams = ["PED"]

    const formik = useFormik({
        initialValues: {
            ccNo: "",
            name: "",
            email: "",
            team: "",
            department: "",
            designation: "",
            // role: "",
        },
        validationSchema: Yup.object({
            ccNo: Yup.string().required("CC Number is required"),
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            team: Yup.string().required("Team is required"),
            department: Yup.string().required("Department is required"),
            designation: Yup.string().required("Designation is required"),
            // role: Yup.string().required("Role is required"),
        }),
        onSubmit: async (values) => {
            const payload = {
                cc_no: values.ccNo,
                name: values.name,
                mailid: values.email,
                team: values.team,
                department: values.department,
                designation: values.designation,
                // role: values.role,
            };
            try {
                await dispatch(managerAddUserApi(payload));
                dispatch(getManagerTeamMemberListApi());
                setOpenModal(false);
            } catch (error) {
                console.error("Error saving Team Member:", error);
                alert("Failed to Add New User. Please try again.");
            }
        },
    });
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        maxWidth: 800,
                        width: "90%",
                        bgcolor: "#fff",
                        borderRadius: 2,
                        boxShadow: 24,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        overflowY: "auto",
                        maxHeight: "90vh",
                    }}
                >

                    <CardHeader
                        title={
                            <Typography variant="h6" fontWeight={700} color="white">
                                Add New Team Member
                            </Typography>
                        }
                        sx={{ textAlign: { xs: "center", sm: "left", backgroundColor: "#00796b", color: "white", padding: "13px 16px" } }}
                    />

                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        padding={3}
                    >
                        <FormikTextField formik={formik} name="ccNo" label="CC Number" required />
                        <FormikTextField formik={formik} name="name" label="Name" required />
                        <FormikTextField
                            formik={formik}
                            name="email"
                            label="Email ID"
                            type="email"
                            required
                        />

                        {/* Department */}
                        <FormikTextField
                            formik={formik}
                            name="department"
                            label="Department"
                            select
                            required
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                    {dept}
                                </MenuItem>
                            ))}
                        </FormikTextField>
                        <FormikTextField
                            formik={formik}
                            name="team"
                            label="Team"
                            select
                            required
                        >
                            {teams.map((team) => (
                                <MenuItem key={team} value={team}>
                                    {team}
                                </MenuItem>
                            ))}
                        </FormikTextField>
                        <FormikTextField
                            formik={formik}
                            name="designation"
                            label="Designation"
                            type="text"
                            required
                        />



                        <Button type="submit" fullWidth sx={{ mt: 2, backgroundColor: "#00796b", color: "white" }}>
                            Submit
                        </Button>
                    </Box>
                    {/* </Paper> */}
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};

export default ManagerAddNewEmployeeModal;