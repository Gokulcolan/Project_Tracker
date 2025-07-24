import {
  Box,
  Card,
  Typography,
  Divider,
  CardHeader,
  CardContent,
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slice/userSlice";
import DonutChart from "../chart/DonutChart";

const ProjectOverviewCard = ({ project }) => {

  const { getMilestonesChartByProjectForUserDetail } = useSelector(userSelector);

  return (
    <Card
      elevation={4}
      sx={{
        // p: 3,
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {/* Left Side - Project Info */}
        <Box sx={{ width: { xs: "100%", md: "50%", }, backgroundColor: "#c8e6c9 " }}>

          <CardHeader
            // avatar={<CelebrationIcon />}
            title={
              <Typography variant="h6" fontWeight={700} color="white">
                Project Overview
              </Typography>
            }
            sx={{ textAlign: { xs: "center", sm: "left", backgroundColor: "#00796b", color: "white", padding: "13px 16px" } }}
          />

          {/* <br /> */}

          <CardContent>
            <InfoRow icon={<AccountBoxIcon color="primary" />} label="Project Name" value={project.projectName} />
            <InfoRow icon={<PeopleIcon color="primary" />} label="Project Manager" value={project.projectManager} />
            <InfoRow icon={<PeopleIcon color="primary" />} label="Project Sponsor" value={project.projectSponsor} />
            <InfoRow icon={<PeopleIcon color="secondary" />} label="Team Members" value={project.teamMember} />
            <InfoRow icon={<BusinessIcon color="success" />} label="Business Unit" value={project.totalRate} />
            <InfoRow icon={<InventoryIcon color="warning" />} label="Product" value={project.product} />
            <InfoRow icon={<BusinessIcon color="info" />} label="Plant" value={project.loggedHours} />
            <InfoRow icon={<CategoryIcon />} label="Category" value={project.billingType} />
            <InfoRow icon={<EventIcon color="primary" />} label="Start Date" value={project.startDate} />
            <InfoRow icon={<EventIcon color="error" />} label="Deadline" value={project.deadline} />
            <InfoRow icon={<InfoOutlinedIcon />} label="Description" value={project.description} />
          </CardContent>
        </Box>

        {/* Right Side - Donut Chart */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            mt: { xs: 4, md: 0 },
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: "left" }}>
            Milestone Status
          </Typography>
          <br />

          <Box sx={{ width: "100%" }}>
            <DonutChart milestones={getMilestonesChartByProjectForUserDetail?.data?.status_distribution} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center" mb={2}>
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

export default ProjectOverviewCard;
