import {
  Button,
  Box,
  Container,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../../componenets/common/Fields/formikTextField";
import { useDispatch } from "react-redux";
import { AdminAddUserApi } from "../../../redux/action/adminAction";

const departments = ["Alternator", "Starter", "Wiper", "Process Development - MFG", "Process Development - Assembly and AI"];

const roles = ["manager", "user"];

const AdminHome = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      ccNo: "",
      name: "",
      email: "",
      department: "",
      designation: "",
      role: "",
    },
    validationSchema: Yup.object({
      ccNo: Yup.string().required("CC Number is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      department: Yup.string().required("Department is required"),
      designation: Yup.string().required("Designation is required"),

      role: Yup.string().required("Role is required"),

    }),
    onSubmit: (values) => {
      const payload = {
        cc_no: values.ccNo,
        name: values.name,
        mailid: values.email,
        department: values.department,
        designation: values.designation,
        role: values.role,

      };
      dispatch(AdminAddUserApi(payload));
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Admin ‑ Add User
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
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
            name="designation"
            label="Designation"
            type="text"
            required
          />

          {/* Role */}
          <FormikTextField
            formik={formik}
            name="role"
            label="Role"
            select
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </FormikTextField>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminHome;
