import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import ProjectOverviewCard from "../../common/cards/projectOverviewCard"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMilestonesByProjectForUserApi, MilestonesChartByProjectForUserApi, userViewSingleProjectApi } from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";
import CommonTable from "../../common/Table/commonTable";
import { userViewMilestoneProjectTableHead } from "../../../utils/constants/userTableData";
import UserAddMilestoneModal from "../../common/modal/userAddMileStoneModal";
import UserUpdateMilestoneModal from "../../common/modal/userUpdateMilestoneModal";
import AddNewTask from '../AddNewTask';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const tabStyles = {
    backgroundColor: "#00796b",
    borderRadius: "12px",
    paddingX: 2,
    paddingY: 1,
    // display: "inline-flex",
    minHeight: "48px",
    ".MuiTab-root": {
        color: "white",
        fontWeight: "500",
        borderRadius: "8px",
        textTransform: "none",
        // padding: "0px 16px",
        "&.Mui-selected": {
            backgroundColor: "white",
            color: "black",
            fontWeight: "600",
            height: "10px"
        },
    },
    ".MuiTabs-indicator": {
        display: "none", // hide underline
    },
};


export default function ProjectDashboard() {


    const { state } = useLocation();
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const projectRefId = state?.projectRefId;
    const { userViewSingleProjectDetail, getMilestonesByProjectForUserDetail } = useSelector(userSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (projectRefId) {
            dispatch(userViewSingleProjectApi(projectRefId));
            dispatch(getMilestonesByProjectForUserApi(projectRefId));
            dispatch(MilestonesChartByProjectForUserApi(projectRefId))
        }
    }, [dispatch, projectRefId]);

    // const handleAddMilestone = () => {
    //     setSelectedMilestone({
    //         projectRefId: projectRefId,
    //         // milestoneRefId: row.milestone_ref_id,
    //     });
    //     setOpen(true);
    // }

    const handleActionClick = (action, row) => {
        switch (action) {

            case "view":
                // if (row.status === null) {
                setSelectedMilestone({
                    projectRefId: projectRefId,
                    milestoneRefId: row.milestone_ref_id,
                    milestoneData: row,
                });
                setOpen(true);
                // } else {
                //     alert("Set Milestone is Already Completed now you are not able to view.");
                // }
                break;
            case "edit":
                setSelectedMilestone({
                    projectRefId: projectRefId,
                    milestoneRefId: row.milestone_ref_id,
                    milestoneData: row,
                });
                setOpenUpdate(true);
                break;
            // case "delete":
            //     if (window.confirm(`Are you sure you want to delete "${row.project_name}"?`)) {
            //         console.log("DELETE", row);
            //         // dispatch(deleteProjectApi(row.id))
            //     }
            //     break;
            default:
                break;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={tabStyles}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Project Overview" {...a11yProps(0)} />
                    <Tab label="Milestones" {...a11yProps(1)} />
                    <Tab label="Task" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ padding: "16px 0" }}>
                    <Box >
                        <ProjectOverviewCard
                            project={{
                                projectId: userViewSingleProjectDetail?.data?.project_id,
                                progress: 40, // Calculate if needed
                                customerName: userViewSingleProjectDetail?.data?.project_sponsor,
                                customerLink: "",
                                billingType: userViewSingleProjectDetail?.data?.category,
                                totalRate: userViewSingleProjectDetail?.data?.business_unit,
                                status: "In Progress",
                                dateCreated: userViewSingleProjectDetail?.data?.created_at?.split("T")[0],
                                startDate: userViewSingleProjectDetail?.data?.start_date,
                                deadline: userViewSingleProjectDetail?.data?.enddate,
                                estimatedHours: "90:00",
                                loggedHours: userViewSingleProjectDetail?.data?.plant,
                                description: userViewSingleProjectDetail?.data?.project_description,
                                projectManager: userViewSingleProjectDetail?.data?.project_manager,
                                projectName: userViewSingleProjectDetail?.data?.project_name,
                                projectSponsor: userViewSingleProjectDetail?.data?.project_sponsor,
                                teamMember: userViewSingleProjectDetail?.data?.teammember,
                                product: userViewSingleProjectDetail?.data?.product,
                            }}
                        />
                    </Box>

                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CommonTable
                    columns={userViewMilestoneProjectTableHead}
                    data={
                        Array.isArray(getMilestonesByProjectForUserDetail?.data)
                            ? getMilestonesByProjectForUserDetail.data
                            : []
                    }
                    onActionClick={handleActionClick}
                />

                <UserAddMilestoneModal
                    openModal={open}
                    setOpenModal={() => setOpen(false)}
                    projectRefId={selectedMilestone?.projectRefId}
                    milestoneRefId={selectedMilestone?.milestoneRefId}
                    milestoneData={selectedMilestone?.milestoneData}
                />

                <UserUpdateMilestoneModal
                    openModal={openUpdate}
                    setOpenModal={() => setOpenUpdate(false)}
                    projectRefId={selectedMilestone?.projectRefId}
                    milestoneRefId={selectedMilestone?.milestoneRefId}
                    milestoneData={selectedMilestone?.milestoneData}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <AddNewTask />
            </CustomTabPanel>
        </Box>
    );
}
