import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    Stack,
    Button,
    TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../common/Fields/formikTextField";
import FormikDropdown from "../../common/Fields/formikDropDown";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getManagerTeamMemberApi, managerAddProjectApi } from "../../../redux/action/managerAction";
import { managerSelector, resetManagerAddProjectDetail } from "../../../redux/slice/managerSlice";


const priorities = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" },
];

const categories = [
    { value: "Web App", label: "Web App" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "Internal Tool", label: "Internal Tool" },
    { value: "Research", label: "Research" },
];



// const teammember = [
//     { value: "Gokul", label: "Gokul" },
//     { value: "Surya", label: "Surya" },
//     { value: "Bala", label: "Bala" },
//     { value: "Kani", label: "Kani" },
//     { value: "sharon", label: "sharon" },
// ];

const validationSchema = Yup.object({
    project_id: Yup.string().required("Project ID is required"),
    project_name: Yup.string().required("Project Name is required"),
    category: Yup.string().required("category is required"),
    product: Yup.string().required("product is required"),
    start_date: Yup.date().required("Start date is required"),
});

const twoPerRowStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px,2fr))",
    gap: 2,
};

const AddProjectForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { getManagerTeamMemberDetail, managerAddProjectDetail } = useSelector(managerSelector);

    const handleTeamMembers = () => {
        dispatch(getManagerTeamMemberApi());
    };

    const TeamMemberOptions = getManagerTeamMemberDetail?.data?.map((val, i) => ({
        value: val.ref_id,
        label: val.name,
    }))

    const formik = useFormik({
        initialValues: {
            project_name: "",
            business_unit: "",
            plant: "",
            project_id: "",
            project_sponsor: "",
            product: "",
            category: "",
            start_date: dayjs(),
            enddate: null,
            project_description: "",
            teammember_ref_ids: ""
        },
        // validationSchema,
        onSubmit: (values) => {
            const selectedMembers = getManagerTeamMemberDetail?.data?.filter((member) =>
                values.teammember_ref_ids.includes(member.ref_id)
            );
            const payload = {
                ...values,
                teammember_ref_ids: selectedMembers.map((member) => ({

                    ref_id: member.ref_id,
                    name: member.name
                })),
                start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
                enddate: values.enddate ? dayjs(values.enddate).format("YYYY-MM-DD") : null,
            };
            dispatch(managerAddProjectApi(payload));

            // if (managerAddProjectDetail?.success === true) {
            //     navigate("/managerDashboard/home");
            // } else {
            //     // optional: show error toast or message
            //     console.warn("Project creation failed");
            // }
        },
    });

    useEffect(() => {
        if (managerAddProjectDetail?.success === true) {
            navigate("/managerDashboard/home");
            dispatch(resetManagerAddProjectDetail());
        }
    }, [managerAddProjectDetail]);
    
    useEffect(() => {
        dispatch(resetManagerAddProjectDetail());
    }, []);


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card elevation={6} sx={{ maxWidth: 1200, borderRadius: 4 }}>
                <CardHeader
                    avatar={<CelebrationIcon />}
                    title={
                        <Typography variant="h6" fontWeight={700} color="white">
                            Add New Project
                        </Typography>
                    }
                    sx={{ textAlign: { xs: "center", sm: "left", backgroundColor: "#00796b", color: "white" } }}
                />

                <CardContent>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={twoPerRowStyles}>
                        {/* First Column */}
                        <FormikTextField formik={formik} name="project_name" label="Project Name" required />
                        <FormikTextField formik={formik} name="business_unit" label="Business Unit" />
                        <FormikTextField formik={formik} name="plant" label="Plant Name" />
                        <FormikTextField formik={formik} name="project_id" label="Project ID" required />
                        <FormikTextField formik={formik} name="project_sponsor" label="Project Sponsor" />
                        {/* <FormikTextField formik={formik} name="project_manager" label="Project Manager" /> */}

                        <DatePicker
                            label="Start Date"
                            value={formik.values.start_date}
                            onChange={(value) => formik.setFieldValue("start_date", value)}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="normal" />
                            )}
                        />

                        <DatePicker
                            label="Expected End Date"
                            value={formik.values.enddate}
                            onChange={(value) => formik.setFieldValue("enddate", value)}
                            renderInput={(params) => (
                                <FormikTextField {...params} formik={formik} name="enddate" />
                            )}
                        />

                        <FormikDropdown
                            formik={formik}
                            name="category"
                            label="category"
                            options={categories}

                            required
                        />

                        <FormikDropdown
                            formik={formik}
                            name="product"
                            label="product"
                            options={priorities}
                            required
                        />

                        <FormikDropdown
                            formik={formik}
                            name="teammember_ref_ids"
                            label="Team Members"
                            onOpen={handleTeamMembers}  // Correct way to trigger data loading
                            options={TeamMemberOptions}
                            multiple
                            required
                        />

                        <FormikTextField
                            formik={formik}
                            name="project_description"
                            label="Project Description"
                            multiline
                            rows={3}
                        />

                        <br />
                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} >

                            <button type="submit" className="submit-btn">
                                Create Project and Add Milestones
                            </button>
                            <button type="button" onClick={formik.handleReset} className="cancel-btn">
                                Cancel
                            </button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </LocalizationProvider>
    );
};

export default AddProjectForm;
