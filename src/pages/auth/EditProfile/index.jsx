import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    mailid: user.mailid || "",
    username: user.username || "",
    department: user.department || "",
    project_manager_name: user.project_manager_name || "",
    ref_id: user.ref_id || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting updated profile:", formData);
    // You can call your update profile API here
  };

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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
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
            label="Project Manager"
            name="project_manager_name"
            value={formData.project_manager_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ref ID"
            name="ref_id"
            value={formData.ref_id}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank if not changing"
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
