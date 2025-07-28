import { Box, Button, Card, CardContent, CardHeader, Chip, TextField, Typography } from "@mui/material"
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect, useState } from "react";
import { askForProjectApprovalUserApi } from "../../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { managerSelector } from "../../../redux/slice/managerSlice";
import { finalProjectCommentsApi } from "../../../redux/action/managerAction";
import { handleSesssionStorage } from "../../../utils/helperFunction";

const ProjectApproval = ({ project }) => {
    console.log(project, "asdadada")
    const dispatch = useDispatch()
    const projectRefId = project?.projectRefId
    const [comment, setComment] = useState("");
    const { finalProjectCommentsDetail } = useSelector(managerSelector)
    const userData = handleSesssionStorage("get", "user");
    const parsedUser = JSON.parse(userData);
    console.log(parsedUser.name, "dev"); // "Bk"


    const today = new Date();
    const currentDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getFullYear()}`;


    const handleApproval = () => {
        const payload = {
            comment,
            date: currentDate
        };
        dispatch(askForProjectApprovalUserApi(payload, projectRefId));
        setComment("");
    };

    useEffect(() => {
        if (projectRefId) {
            dispatch(finalProjectCommentsApi(projectRefId));
        }
    }, [dispatch, projectRefId]);


    return (
        <>
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
                            <Typography variant="h6" fontWeight={700} color="white" sx={{ fontSize: "18px" }}>
                                Project Completion Approval
                            </Typography>
                        }
                        sx={{ textAlign: { xs: "center", fontSize: "14px", sm: "left", backgroundColor: "#00796b", color: "white", padding: "13px 16px" } }}
                    />

                    <CardContent>
                        <InfoRow icon={<AccountBoxIcon color="primary" />} label="Project Name" value={project?.projectName} />
                        <InfoRow icon={<PeopleIcon color="secondary" />} label="Team Members" value={project?.teamMember} />
                        <InfoRow icon={<EventIcon color="primary" />} label="Start Date" value={project?.startDate} />
                        <InfoRow icon={<EventIcon color="error" />} label="Deadline" value={project?.deadline} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Manager" value={project.projectManager} />
                        <InfoRow icon={<PeopleIcon color="primary" />} label="Project Sponsor" value={project.projectSponsor} />
                        {/* <InfoRow icon={<PeopleIcon color="primary" />} label="Status" value={project.status} /> */}
                    </CardContent>
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={`Project Status - ${project.status}` || "N/A"}
                            color={
                                project.status === "Completed"
                                    ? "success"
                                    : project.status === "In Progress"
                                        ? "primary"
                                        : project.status === "Incomplete"
                                            ? "warning"
                                            : "default"
                            }
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
                        opacity: parsedUser?.name !== project?.projectLead ? 0.6 : 1, // Slightly faded if disabled
                        pointerEvents: parsedUser?.name !== project?.projectLead ? "none" : "auto" // Prevent interaction
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
                        disabled={parsedUser?.name !== project?.projectLead}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleApproval}
                        sx={{ alignSelf: "flex-end", mt: 2 }}
                        disabled={parsedUser?.name !== project?.projectLead}
                    >
                        Ask For Manager Approval
                    </Button>
                </Box>


            </Card>
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