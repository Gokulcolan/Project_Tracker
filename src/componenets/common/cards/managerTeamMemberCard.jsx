import {
    Card,
    Typography,
    Avatar,
    Grid,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagerTeamMembersCard = ({ data = [] }) => {

    const navigate = useNavigate()

    const handleViewWork = (row) => {
        navigate("/managerDashboard/viewTeamProjectList", {
            state: { projectRefId: row.ref_id },
        });
    };


    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {data.map((member) => (
                    <Grid item xs={12} sm={6} md={4} key={member.ref_id}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                minHeight: 140,
                                p: 3,
                                color: "white",
                                background: "linear-gradient(135deg, #00796b, #4db6ac)",
                                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                                transition: "0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            <Box display="flex" gap={3} mb={2}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#ffe175",
                                        color: "black",
                                        width: 56,
                                        height: 56,
                                        fontSize: 24,
                                    }}
                                >
                                    {member.name?.charAt(0).toUpperCase() || "U"}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        {member.name}
                                    </Typography>
                                    <Typography fontSize={14} >
                                        CC No: {member.cc_no}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 2, borderColor: "white" }} />

                            <Box sx={{textAlign:"left"}}>
                                <Typography variant="body1" fontWeight={500}>
                                    📧 {member.mailid}
                                </Typography>
                                <Typography variant="body2" >
                                    🏢 Designation: {member.designation}
                                </Typography>
                            </Box>

                            <Box mt={3} textAlign="left">

                                <button onClick={() => handleViewWork(member)} style={{ padding: "5px 10px", borderRadius: "10px", border: "none" }}>
                                    View Work Details
                                </button>

                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ManagerTeamMembersCard;
