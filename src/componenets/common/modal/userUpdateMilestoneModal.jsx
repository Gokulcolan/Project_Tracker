import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMilestonesByProjectForUserApi, MilestonesChartByProjectForUserApi, updateMilestonesByProjectForUserApi } from "../../../redux/action/userAction";

const UserUpdateMilestoneModal = ({
  openModal,
  setOpenModal,
  projectRefId,
  milestoneRefId,
  milestoneData,
}) => {
  console.log(milestoneData, "milestoneData")
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
    console.log(`Updating ${field} to`, value); // ← this must show when you type
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const fmt = (d) =>
    d ? `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}` : null;

  const handleSubmit = async () => {
    const pl = {
      milestone_ref_id: milestoneRefId,
      name: form.name.trim(),
      startdate: fmt(form.startDate),
      enddate: fmt(form.endDate),
      actual_date: fmt(form.actualDate),
      remarks: form.remarks.trim(),
      // 🔁 Use milestoneData.status instead of form.project_status
      bottleneck_issue: milestoneData.status === "Overdue" ? form.bottleneck_issue : "",
      current_outlook_date:
        milestoneData.status === "Overdue" ? fmt(form.current_outlook_date) : null,
      accountable_function:
        milestoneData.status === "Overdue" ? form.accountable_function : "",
    };

    try {
      await dispatch(updateMilestonesByProjectForUserApi(milestoneRefId, pl));
      // optionally check result?.status === 'success'
      dispatch(getMilestonesByProjectForUserApi(projectRefId));
      dispatch(MilestonesChartByProjectForUserApi(projectRefId));

      // Clear form
      setForm([{ bottleneck_issue: "", current_outlook_date: null, accountable_function: null }]);
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving milestone:", error);
      alert("Failed to save milestone. Please try again.");
    }
  };

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
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Update Milestone
          </Typography>

          {/* -------- one‑field‑per‑row layout -------- */}
          <Stack spacing={2}>
            <TextField
              label="Milestone Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              fullWidth
              size="small"
              disabled
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
              disabled
            />

            {(milestoneData?.status === "Completed" || milestoneData?.status === "In Progress") && (
              <>
                <Typography>
                  If the project is <strong>Completed</strong>, please enter the <em>Actual Completion Date</em>.
                </Typography>
                <DatePicker
                  label="Actual Completed Date"
                  value={form.actualDate}
                  onChange={(d) => handleChange("actualDate", d)}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </>
            )}
            {/* extra fields when not completed */}
            {milestoneData?.status === "Overdue" && (
              <>
                {console.log("Overdue block rendered")}
                <Typography>
                  If the project is <strong>Overdue</strong>, please provide the <em>issue details</em> and the <em>current outlook date</em>.
                </Typography>
                <TextField
                  label="Bottleneck Issue"
                  value={form.bottleneck_issue}
                  onChange={(e) => handleChange("bottleneck_issue", e.target.value)}
                  fullWidth
                  size="small"
                />

                <DatePicker
                  label="Current Outlook Date"
                  value={form.current_outlook_date}
                  onChange={(d) => handleChange("current_outlook_date", d)}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />

                <TextField
                  label="Accountable Function"
                  value={form.accountable_function}
                  onChange={(e) => handleChange("accountable_function", e.target.value)}
                  fullWidth
                  size="small"
                />
              </>
            )}
          </Stack>

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default UserUpdateMilestoneModal;
