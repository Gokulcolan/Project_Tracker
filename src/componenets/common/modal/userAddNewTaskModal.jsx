import {
    Box,
    Button,
    Grid,
    Modal,
    Paper,
    TextField,
    IconButton,
    Typography,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getTaskListByProjectForUserApi,
    userAddTaskApi,
    userMilestoneListByProjectForTaskApi,
    // userProjectMembersListForTaskApi,
} from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";

const UserAddNewTaskModal = ({
    openModal,
    setOpenModal,
    projectRefId,
}) => {
    const [task, setTask] = useState([]);
    const [milestoneName, setMilestoneName] = useState([]);
    // const [projectMemberName, setProjectMemberName] = useState([]);

    const dispatch = useDispatch();
    const { usermilestoneListByProjectForTaskUserDetail } = useSelector(userSelector);

    useEffect(() => {
        if (openModal) {
            setTask([
                {
                    milestone_ref_id: "",
                    task_name: "",
                    date: null,
                    // done_by: "",
                    description: "",
                },
            ]);
        }
    }, [openModal])

    useEffect(() => {
        if (openModal && projectRefId) {
            dispatch(userMilestoneListByProjectForTaskApi(projectRefId));
            // dispatch(userProjectMembersListForTaskApi(projectRefId));
        }
    }, [openModal, projectRefId]);

    useEffect(() => {
        if (usermilestoneListByProjectForTaskUserDetail?.data) {
            setMilestoneName(usermilestoneListByProjectForTaskUserDetail.data);
        }
    }, [usermilestoneListByProjectForTaskUserDetail]);

    const handleChange = (index, field, value) => {
        setTask((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addTask = () => {
        setTask((prev) => [
            ...prev,
            {
                milestone_ref_id: "",
                task_name: "",
                date: null,
                // done_by: "",
                description: "",
            },
        ]);
    };

    const removeTask = (index) => {
        setTask((prev) => prev.filter((_, i) => i !== index));
    };

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // yyyy-mm-dd
    };

    const handleSave = async () => {
        const payloads = task.map((t) => ({
            milestone_ref_id: t.milestone_ref_id,
            task_name: t.task_name,
            date: formatDate(t.date),
            // done_by: t.ref_id,
            description: t.descriptions,
        }));

        try {
            await dispatch(userAddTaskApi(payloads, projectRefId));
            // Optionally refresh the task list
            dispatch(getTaskListByProjectForUserApi(projectRefId));
            setOpenModal(false);
        } catch (error) {
            alert("Failed to save task(s). Please try again.");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        maxWidth: 800,
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
                    <Typography variant="h6" fontWeight={700} textAlign="center" mb={1}>
                        📝 Daily Task Entry
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        mb={3}
                    >
                        Fill out your tasks below for today’s milestone.
                    </Typography>

                    {task.map((m, index) => (
                        <Paper
                            key={index}
                            sx={{
                                mb: 2,
                                px: 3,
                                py: 2,
                                background: "linear-gradient(145deg, #e0f2f1, #ffffff)",
                                borderLeft: "6px solid #00796b",
                                borderRadius: 3,
                                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.08)",
                                transition: "all 0.25s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
                                },
                            }}
                        >
                            <Box
                                display="grid"
                                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                                gap={2}
                            >
                                {/* Milestone Select */}
                                <FormControl fullWidth size="small" required>
                                    <InputLabel>Milestone</InputLabel>
                                    <Select
                                        value={m.milestone_ref_id}
                                        label="Milestone"
                                        onChange={(e) => handleChange(index, "milestone_ref_id", e.target.value)}
                                    >
                                        {milestoneName?.map((milestone) => (
                                            <MenuItem key={milestone.milestone_ref_id} value={milestone.milestone_ref_id}>
                                                {milestone.milestone_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Task Name */}
                                <TextField
                                    label="Task Name"
                                    value={m.task_name}
                                    onChange={(e) => handleChange(index, "task_name", e.target.value)}
                                    fullWidth
                                    size="small"
                                    required
                                />
{/* 
                                <FormControl fullWidth size="small" required>
                                    <InputLabel>Project Members</InputLabel>
                                    <Select
                                        value={m.ref_id}
                                        label="Project Members"
                                        onChange={(e) => handleChange(index, "ref_id", e.target.value)}
                                    >
                                        {projectMemberName?.map((val) => (
                                            <MenuItem key={val.ref_id} value={val.ref_id}>
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}

                                {/* Date Picker */}
                                <DatePicker
                                    label="Date"
                                    value={m.date}
                                    onChange={(date) => handleChange(index, "date", date)}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                            required: true,
                                        },
                                    }}
                                />

                                {/* Descriptions Full Width */}
                                <TextField
                                    label="Descriptions"
                                    value={m.descriptions}
                                    onChange={(e) => handleChange(index, "descriptions", e.target.value)}
                                    fullWidth
                                    size="small"
                                    multiline
                                    minRows={2}
                                    maxRows={4}
                                    sx={{ gridColumn: "1 / -1" }} // span full width
                                />

                                {/* Action Buttons Full Width Right Aligned */}
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    gap={1}
                                    sx={{ gridColumn: "1 / -1" }}
                                >
                                    <Tooltip title="Add another task">
                                        <IconButton onClick={addTask} color="primary">
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {task.length > 1 && (
                                        <Tooltip title="Remove this task">
                                            <IconButton onClick={() => removeTask(index)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </Box>
                        </Paper>
                    ))}


                    <Box textAlign="right" mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={() => setOpenModal(false)} color="inherit">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save Task
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};

export default UserAddNewTaskModal;
