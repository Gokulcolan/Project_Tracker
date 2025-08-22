import { Box, Button, Card, CardContent, CardHeader, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finalProjectCommentsApi, projectStatusUpdateManagerApi } from "../../../redux/action/managerAction";
import { managerSelector } from "../../../redux/slice/managerSlice";

const ProjectApproval = ({ project }) => {

    const dispatch = useDispatch()
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [approval_categories, setApproval_categories] = useState("")
    const [approve_value, setApprove_value] = useState("")
    const projectRefId = project.projectRefId
    const { finalProjectCommentsDetail } = useSelector(managerSelector)

    const handleApproval = () => {
        const payload = { projectId: projectRefId, comment, status, approval_categories, approve_value };
        dispatch(projectStatusUpdateManagerApi(payload, projectRefId))
            .then(() => {
                setComment(""); // clear comment
                setStatus(""); // reset status if needed
                setApproval_categories("");
                setApprove_value("");
                refreshComments(); // fetch updated comments
            });
    };


    const refreshComments = () => {
        if (projectRefId) {
            dispatch(finalProjectCommentsApi(projectRefId));
        }
    };

    useEffect(() => {
        refreshComments();
    }, [dispatch, projectRefId]);


    return (
        <>
            <Card
                elevation={4}
                sx={{
                    borderRadius: 4,
                    display: "flex"
                }}
            >
                <Box sx={{ width: { xs: "100%", md: "50%" }, backgroundColor: "#c8e6c9 " }}>
                    <CardHeader
                        // avatar={<CelebrationIcon />}
                        title={
                            <Typography variant="h6" fontWeight={700} color="white" sx={{ fontSize: "18px" }}>
                                Project Completion Approval
                            </Typography>
                        }
                        sx={{ textAlign: { xs: "center", fontSize: "14px", sm: "left", backgroundColor: "#00796b", color: "white", padding: "13px 16px" } }}
                    />
                    {/* <br /> */}
                    <CardContent>
                        <InfoRow icon={<AccountBoxIcon color="primary" />} label="Project Name" value={project?.projectName} />
                        <InfoRow icon={<PeopleIcon color="secondary" />} label="Team Members" value={project?.teamMember} />
                        <InfoRow icon={<EventIcon color="primary" />} label="Start Date" value={project?.startDate} />
                        <InfoRow icon={<EventIcon color="error" />} label="Deadline" value={project?.deadline} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Lead" value={project.projectLead} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Manager" value={project.projectManager} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Sponsor" value={project.projectSponsor} />
                    </CardContent>
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={`Project Status - ${project.status}` || "N/A"}
                            sx={{ fontWeight: 600, fontSize: "0.95rem", px: 2, borderRadius: "10px", }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        justifyContent: "space-between",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel id="status-label">Project Status</InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label="Project Status"
                        >
                            <MenuItem disabled>🟢 Positive</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>

                            <MenuItem disabled>🟡 Neutral</MenuItem>
                            <MenuItem value="In Review">In Review</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>

                            <MenuItem disabled>🔴 Negative</MenuItem>
                            <MenuItem value="Needs Changes">Needs Changes</MenuItem>
                            <MenuItem value="Dropped">Dropped</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid container spacing={2}>
                        {/* Dropdown */}
                        <Grid item xs={6} sx={{ width: "300px" }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="improvement-label">Improvement Type</InputLabel>
                                <Select
                                    labelId="improvement-label"
                                    label="Improvement Type"
                                    value={approval_categories}
                                    onChange={(e) => setApproval_categories(e.target.value)}
                                >
                                    <MenuItem value="investment_saving">Investment Saving</MenuItem>
                                    <MenuItem value="man_power_reduction">Man Power Reduction</MenuItem>
                                    <MenuItem value="cost_reduction">Cost Reduction</MenuItem>
                                    <MenuItem value="productivity_improvement">Productivity Improvement</MenuItem>
                                    <MenuItem value="quality_improvement">Quality Improvement</MenuItem>
                                    <MenuItem value="npi">NPI</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Percentage Input */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Value"
                                type="number"
                                value={approve_value}
                                onChange={(e) => setApprove_value(e.target.value)}

                            />
                        </Grid>
                    </Grid>
                    <TextField
                        placeholder="Enter your comments here..."
                        multiline
                        minRows={5}
                        fullWidth
                        size="small"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleApproval}
                        sx={{ alignSelf: "flex-end", mt: 2 }}
                    >
                        Submit
                    </Button>
                </Box>

            </Card>
            <br />
            <Box
                sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    p: 2,
                    backgroundColor: "#f0f2f5", // Soft neutral background
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                    "&::-webkit-scrollbar": { width: "6px" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#b0bec5",
                        borderRadius: "10px"
                    }
                }}
            >
                {/* Header */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "white",
                        backgroundColor: "#00796b",
                        p: 1,
                        borderRadius: "10px"
                    }}
                >
                    Overall Project Approval Comments
                </Typography>

                {finalProjectCommentsDetail?.data?.map((item, index) => {
                    const isUser = item.by === "user";
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: isUser ? "flex-start" : "flex-end",
                                mb: 2
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: isUser ? "flex-start" : "flex-end"
                                }}
                            >
                                {/* Name */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mb: 0.3,
                                        color: "text.secondary",
                                        fontWeight: 500
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                {/* Chat Bubble */}
                                <Box
                                    sx={{
                                        width: "40%",
                                        background: isUser
                                            ? "linear-gradient(90deg, #339488 0%, #a1d5cf 100%)"
                                            : "linear-gradient(90deg, #2f8277 0%, #9fd1ca 100%)"

                                        , // Slightly darker for manager
                                        color: "black",
                                        fontWeight: "700",
                                        p: 1.5,
                                        borderRadius: isUser
                                            ? "14px 14px 14px 4px"
                                            : "14px 14px 4px 14px",
                                        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            wordWrap: "break-word",
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {item.comment}
                                    </Typography>
                                </Box>

                                {/* Timestamp */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 0.5,
                                        color: "text.secondary",
                                        fontSize: "0.7rem"
                                    }}
                                >
                                    {item.timestamp}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>



        </>
    )
}

const InfoRow = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" mb={1.2}>
        <Box display="flex" alignItems="center" minWidth={140} mr={2}>
            {icon && <Box mr={2}>{icon}</Box>}
            <Typography variant="subtitle3" fontWeight={700}>
                {label}:
            </Typography>
        </Box>
        <Typography
            variant="body3"
            color="black"
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                // flex: 1,
            }}
        >
            {value || "-"}
        </Typography>
    </Box>
);

export default ProjectApproval