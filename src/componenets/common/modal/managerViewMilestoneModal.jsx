import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Stack,
    Divider,
    CardHeader,
    Card,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ManagerViewMilestoneModal = ({
    openModal,
    setOpenModal,
  
    milestoneData,
}) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        startDate: null,
        endDate: null,
        actualDate: null,
        remarks: "",
        bottleneck_issue: "",
        current_outlook_date: null,
        accountable_function: "",
        // project_status: "Completed",
    });

    /* ---------- populate form from prop ---------- */
    useEffect(() => {
        if (!milestoneData) return;
        setForm({
            name: milestoneData.name || "",
            startDate: milestoneData.startdate ? new Date(milestoneData.startdate) : null,
            endDate: milestoneData.enddate ? new Date(milestoneData.enddate) : null,
            actualDate: milestoneData.actual_date ? new Date(milestoneData.actual_date) : null,
            remarks: milestoneData.remarks || "",
            bottleneck_issue: milestoneData.bottleneck_issue || "",
            current_outlook_date: milestoneData.current_outlook_date
                ? new Date(milestoneData.current_outlook_date)
                : null,
            accountable_function: milestoneData.accountable_function || "",
            //   project_status: milestoneData.project_status || "Completed",
        });
    }, [milestoneData]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

 
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        borderRadius: "10px",
                    }}
                >
                   
                    <Card elevation={6} sx={{  borderRadius: 4 }}>
                        <CardHeader
                            // avatar={<CelebrationIcon />}
                            title={
                                <Typography variant="h6" fontWeight={700} color="white">
                                    Milestone Details
                                </Typography>
                            }
                            sx={{ textAlign: { xs: "center", sm: "left", backgroundColor: "#00796b", color: "white"} }}
                        />

                        {/* -------- one‑field‑per‑row layout -------- */}
                        <Stack spacing={2} sx={{ padding: "30px" }}>
                            <TextField
                                label="Milestone Name"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                fullWidth
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                    style: { color: "#000" }, // Normal text color
                                }}
                            />
                            {/* 
            <TextField
              select
              label="Project Status"
              value={form.project_status}
              onChange={(e) => handleChange("project_status", e.target.value)}
              fullWidth
              size="small"
              SelectProps={{ native: true }}
            >
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </TextField> */}

                            <DatePicker
                                label="Start Date"
                                value={form.startDate}
                                onChange={(d) => handleChange("startDate", d)}
                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                                disabled

                            />

                            <DatePicker
                                label="End Date"
                                value={form.endDate}
                                onChange={(d) => handleChange("endDate", d)}
                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                                disabled
                            />

                            <TextField
                                label="Remarks"
                                value={form.remarks}
                                onChange={(e) => handleChange("remarks", e.target.value)}
                                fullWidth
                                size="small"
                                multiline
                                minRows={2}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: "#000" }, // Normal text color
                                }}
                            />
                            <Divider />
                            {(milestoneData?.status === "Completed" || milestoneData?.status === "In Progress") && (
                                <>
                                    <Typography sx={{ fontSize: "14px" }}>
                                        Actual Milestone Completion Date:
                                    </Typography>
                                    <DatePicker
                                        label="Actual Completed Date"
                                        value={form.actualDate}
                                        onChange={(d) => handleChange("actualDate", d)}
                                        slotProps={{ textField: { size: "small", fullWidth: true } }}
                                        disabled
                                    />
                                </>
                            )}
                            {/* extra fields when not completed */}
                            {milestoneData?.status === "Overdue" && (
                                <>
                                    <Typography sx={{ fontSize: "14px" }}>
                                        <span style={{ color: "red" }}> Milestone Overdue</span> — reason and new completion date below.
                                    </Typography>


                                    <TextField
                                        label="Bottleneck Issue"
                                        value={form.bottleneck_issue}
                                        onChange={(e) => handleChange("bottleneck_issue", e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                            style: { color: "#000" }, // Normal text color
                                        }}
                                    />

                                    <DatePicker
                                        label="Current Outlook Date"
                                        value={form.current_outlook_date}
                                        onChange={(d) => handleChange("current_outlook_date", d)}
                                        slotProps={{ textField: { size: "small", fullWidth: true } }}
                                        disabled
                                    />

                                    <TextField
                                        label="Accountable Function"
                                        value={form.accountable_function}
                                        onChange={(e) => handleChange("accountable_function", e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                            style: { color: "#000" }, // Normal text color
                                        }}
                                    />
                                </>
                            )}
                        </Stack>
                    </Card>
                    {/* <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};

export default ManagerViewMilestoneModal;
