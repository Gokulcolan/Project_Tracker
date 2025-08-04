import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/slice/authSlice";
import { EditProfileApi } from "../../../redux/action/authAction";

const EditProfile = () => {
  const { loginDetail } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mailid: "",
    department: "",
    designation: "",
    project_manager_name: "",
  });

  // Load profile details
  useEffect(() => {
    const user = loginDetail?.data?.user;
    if (user) {
      setFormData({
        name: user.name || "",
        mailid: user.mailid || "",
        department: user.department || "",
        designation: user.designation || "",
        project_manager_name: user.project_manager_name || "",
      });
    }
  }, [loginDetail]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    const payload = {
      name: formData.name.trim(),
      designation: formData.designation.trim(),
    };
    dispatch(EditProfileApi(payload));
  };

  if (!loginDetail) {
    return (
      <Typography textAlign="center" mt={4}>
        Loading profile...
      </Typography>
    );
  }

  return (
    <Box
      className="bgLogin"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Edit Profile
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="mailid"
            value={formData.mailid || ""}
            fullWidth
            disabled
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department || ""}
            fullWidth
            disabled
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Project Manager"
            name="project_manager_name"
            value={formData.project_manager_name || ""}
            fullWidth
            disabled
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00796b",
              "&:hover": { backgroundColor: "#005f56" },
              mt: 1,
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProfile;
