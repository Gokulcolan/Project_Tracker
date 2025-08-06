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
    { value: "Alternator ", label: "Alternator " },
    { value: "Starter ", label: "Starter " },
    { value: "Wiper ", label: "Wiper " },
    { value: "Special Motors ", label: "Special Motors " },
    { value: "SMCG", label: "SMCG" },
    { value: "SBD", label: "SBD" },
];

const categories = [
    { value: "New Process Technology - Sustainable Growth ", label: "New Process Technology - Sustainable Growth " },
    { value: "Capacity enhancement (New lines / P&M) - Sustainable Growth ", label: "Capacity enhancement (New lines / P&M) - Sustainable Growth " },
    { value: "New lines to win New Business - Sustainable Growth", label: "New lines to win New Business - Sustainable Growth" },
    { value: "Model Lines (World Class Manufacturing) - Competitive Advantage ", label: "Model Lines (World Class Manufacturing) - Competitive Advantage " },
    { value: "Industry 4.0 - Competitive Advantage ", label: "Industry 4.0 - Competitive Advantage " },
    { value: "Cost reduction - Profitability ", label: "Cost reduction - Profitability " },
    { value: "Investment reduction - Profitability ", label: "Investment reduction - Profitability " },
    { value: "Manpower reduction - Profitability ", label: "Manpower reduction - Profitability " },
    { value: "New products Introduction - Customer Satisfaction", label: "New products Introduction - Customer Satisfaction" },
    { value: "Process Technology (Q Impr.) - Customer Satisfaction", label: "Process Technology (Q Impr.) - Customer Satisfaction" },
    { value: "AI Project", label: "AI Project" },

];


// const priorities = [
//     { value: "Low", label: "Low" },
//     { value: "Medium", label: "Medium" },
//     { value: "High", label: "High" },
//     { value: "Critical", label: "Critical" },
// ];

// const categories = [
//     { value: "Web App", label: "Web App" },
//     { value: "Mobile App", label: "Mobile App" },
//     { value: "Internal Tool", label: "Internal Tool" },
//     { value: "Research", label: "Research" },
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
    const memberData = getManagerTeamMemberDetail?.data ?? [];
    const handleTeamMembers = () => {
        dispatch(getManagerTeamMemberApi());
    };

    const TeamMemberOptions = memberData?.map((val, i) => ({
        value: val.ref_id,
        label: val.name,
    }))

    const TeamLeadOptions = memberData?.map((val, i) => ({
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
            teammember_ref_ids: [],
            project_leader_ref_id: []
        },
        // validationSchema,
        onSubmit: (values) => {

            // if (!getManagerTeamMemberDetail?.data) return;
            const selectedMembers = getManagerTeamMemberDetail?.data?.filter((member) =>
                values.teammember_ref_ids.includes(member.ref_id)
            );
            const leadMembers = getManagerTeamMemberDetail?.data?.filter((member) =>
                values.project_leader_ref_id.includes(member.ref_id)
            );
            const payload = {
                ...values,
                teammember_ref_ids: selectedMembers?.map((member) => ({

                    ref_id: member.ref_id,
                    name: member.name
                })),
                project_leader_ref_id: leadMembers?.map((member) => ({

                    ref_id: member.ref_id,
                    name: member.name
                })),
                start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
                enddate: values.enddate ? dayjs(values.enddate).format("YYYY-MM-DD") : null,
            };
            dispatch(managerAddProjectApi(payload));

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
                            label="Project Members"
                            onOpen={handleTeamMembers}  // Correct way to trigger data loading
                            options={TeamMemberOptions}
                            multiple
                            required
                        />

                        <FormikDropdown
                            formik={formik}
                            name="project_leader_ref_id"
                            label="Project Lead"
                            onOpen={handleTeamMembers}  // Correct way to trigger data loading
                            options={TeamLeadOptions}
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
