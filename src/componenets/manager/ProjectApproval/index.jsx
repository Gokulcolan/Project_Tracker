import { Box, Button, Card, CardContent, CardHeader, Chip, TextField, Typography } from "@mui/material"
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useState } from "react";



const ProjectApproval = ({ project }) => {

    const [comment, setComment] = useState("");

    const handleApproval = () => {

        // Send approval logic or API call
        const payload = {
            projectId: project.id,
            comment,
            // approvedBy: managerId, // if applicable
        };
        console.log("Approval submitted:", payload);
        // Trigger success message or callback
    };

    return (
            <Card
                elevation={4}
                sx={{
                    // p: 3,
                    borderRadius: 4,
                    display: "flex"
                }}
            >
                <Box sx={{ width: { xs: "100%", md: "50%" }, backgroundColor: "#c8e6c9 " }}>
                    <CardHeader
                        // avatar={<CelebrationIcon />}
                        title={
                            <Typography variant="h6" fontWeight={700} color="white" sx={{fontSize:"18px"}}>
                                Project Completion Approval
                            </Typography>
                        }
                        sx={{ textAlign: { xs: "center",fontSize:"14px", sm: "left", backgroundColor: "#00796b", color: "white", padding: "13px 16px" } }}
                    />
                    {/* <br /> */}
                    <CardContent>
                        <InfoRow icon={<AccountBoxIcon color="primary" />} label="Project Name" value={project?.projectName} />
                        <InfoRow icon={<PeopleIcon color="secondary" />} label="Team Members" value={project?.teamMember} />
                        <InfoRow icon={<EventIcon color="primary" />} label="Start Date" value={project?.startDate} />
                        <InfoRow icon={<EventIcon color="error" />} label="Deadline" value={project?.deadline} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Manager" value={project.projectManager} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Sponsor" value={project.projectSponsor} />
                    </CardContent>
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
                    <Typography variant="subtitle1" fontWeight={600}>
                        Project Comments
                    </Typography>

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