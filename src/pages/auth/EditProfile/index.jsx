import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slice/authSlice";

const EditProfile = () => {
  const { loginDetail } = useSelector(authSelector);
  console.log(loginDetail,"loginDetail")

  const [formData, setFormData] = useState({
    name: "",
    mailid: "",
    department: "",
    designation:"",
    project_manager_name: "",
  });

  useEffect(() => {
    if (loginDetail) {
      setFormData({
        name: loginDetail?.data?.user?.name || "",
        mailid: loginDetail?.data?.user?.mailid || "",
        department: loginDetail?.data?.user?.department || "",
        designation: loginDetail?.data?.user?.designation || "",
        project_manager_name: loginDetail?.data?.user?.project_manager_name || "",
      });
    }
  }, [loginDetail]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated Profile Data", formData);
  };

  if (!loginDetail) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Edit Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="mailid"
            value={formData.mailid}
            onChange={handleChange}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formData.department}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Designation"
            name="username"
            value={formData.designation}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Project Manager"
            name="project_manager_name"
            value={formData.project_manager_name}
            onChange={handleChange}
            disabled
          />
        </Grid>


        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#00796b", color: "white" }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditProfile;
