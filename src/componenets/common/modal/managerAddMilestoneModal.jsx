import {
    Box,
    Button,
    Grid,
    Modal,
    Paper,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getMilestonesByProjectForUserApi,
    MilestonesChartByProjectForUserApi,
    userAddMilestoneApi,
} from "../../../redux/action/userAction";
import { handleSesssionStorage } from "../../../utils/helperFunction";
import { getMilestoneByProjectForManagerApi, managerAddMilestoneApi } from "../../../redux/action/managerAction";
import { getMilestonesChartByProjectForManagerReducer } from "../../../redux/slice/managerSlice";

const ManagerAddMilestoneModal = ({ openModal, setOpenModal, projectRefId,milestoneRefId }) => {

    const dispatch = useDispatch();
    //  handleSesssionStorage("add", "ur", roleNumber);
    const role = Number(handleSesssionStorage("get", "ur"));

    console.log(role, "role")

    const [milestones, setMilestones] = useState([
        { name: "", startDate: null, endDate: null, remarks: "" },
    ]);

    const handleChange = (index, field, value) => {
        setMilestones((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
    };

    const addMilestone = () => {
        setMilestones((prev) => [
            ...prev,
            { name: "", startDate: null, endDate: null, remarks: "" },
        ]);
    };

    const removeMilestone = (index) => {
        setMilestones((prev) => prev.filter((_, i) => i !== index));
    };


    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, "0");
        const day = `${d.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
    };


    const handleSave = async () => {
        let hasErrors;

        if (Number(role) !== 2) {
            hasErrors = milestones.some(
                (m) => !m.name || !m.startDate || !m.endDate
            );
        } else {
            hasErrors = milestones.some((m) => !m.name);
        }

        if (hasErrors) {
            alert("Please fill in all required fields.");
            return;
        }

        const payload = milestones.map((m) => ({
            milestone_name: m.name.trim(),
            startdate: formatDate(m.startDate),
            enddate: formatDate(m.endDate),
            remarks: m.remarks.trim(),
        }));

        try {
            if (Number(role) !== 2) {
                const result = await dispatch(userAddMilestoneApi(payload, milestoneRefId));
                // optionally check result?.status === 'success'
                dispatch(getMilestonesByProjectForUserApi(projectRefId));
                dispatch(MilestonesChartByProjectForUserApi(projectRefId));
            } else {
                const result = await dispatch(managerAddMilestoneApi(payload, projectRefId));
                dispatch(getMilestoneByProjectForManagerApi(projectRefId));
                dispatch(getMilestonesChartByProjectForManagerReducer(projectRefId));
            }

            // Clear form
            setMilestones([{ name: "", startDate: null, endDate: null, remarks: "" }]);
            setOpenModal(false);
        } catch (error) {
            console.error("Error saving milestone:", error);
            alert("Failed to save milestone. Please try again.");
        }
    };


    /**
     * Main JSX
     */
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        maxWidth: 1100,
                        width: "90%",
                        p: 3,
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
                    {/* Header */}
                    <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
                        Add Milestoneasdadsad
                    </Typography>

                    {/* Milestone rows */}
                    {milestones?.map((m, index) => (
                        <Paper
                            key={index}
                            sx={{
                                mb: 1.5,
                                px: 2,
                                py: 1.5,
                                background:
                                    "linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)",
                                borderLeft: "5px solid #4caf50",
                                borderRadius: 3,
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                                transition:
                                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.01)",
                                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.1)",
                                },
                            }}
                        >
                            <Grid container spacing={1} alignItems="center">
                                {/* Milestone Name */}
                                <Grid item xs={12} sm={3} md={2.5}>
                                    <TextField
                                        label="Milestone Name"
                                        value={m.name}
                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </Grid>

                                {role != 2 ?
                                    <>
                                        {/* Start Date */}
                                        <Grid item xs={12} sm={3} md={2}>
                                            <DatePicker
                                                label="Start Date"
                                                value={m.startDate}
                                                onChange={(date) => handleChange(index, "startDate", date)}
                                                disabled={role === 2}
                                                slotProps={{
                                                    textField: { size: "small", fullWidth: true, required: true },
                                                }}
                                            />
                                        </Grid>

                                        {/* End Date */}
                                        <Grid item xs={12} sm={3} md={2}>
                                            <DatePicker
                                                label="End Date"
                                                value={m.endDate}
                                                onChange={(date) => handleChange(index, "endDate", date)}
                                                disabled={role === 2}
                                                slotProps={{
                                                    textField: { size: "small", fullWidth: true, required: true },
                                                }}
                                            />
                                        </Grid>

                                        {/* Remarks */}
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                label="Remarks"
                                                value={m.remarks}
                                                onChange={(e) => handleChange(index, "remarks", e.target.value)}
                                                fullWidth
                                                size="small"
                                                multiline
                                                minRows={1}
                                                maxRows={2}
                                                InputProps={{
                                                    readOnly: role === 2,
                                                }}
                                            />
                                        </Grid>
                                    </>
                                    :
                                    ""
                                }

                                {/* Action Buttons */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={1}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: 0.5,
                                    }}
                                >
                                    <IconButton onClick={addMilestone} color="primary" size="small">
                                        <AddCircleIcon fontSize="small" />
                                    </IconButton>
                                    {milestones.length > 1 && (
                                        <IconButton
                                            onClick={() => removeMilestone(index)}
                                            color="error"
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}

                    {/* Footer */}
                    <Box textAlign="right" mt={2}>
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save All Milestones
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};

export default ManagerAddMilestoneModal;
