import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import ProjectOverviewCard from "../../common/cards/projectOverviewCard"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CommonTable from "../../common/Table/commonTable";
import { getMilestoneByProjectForManagerApi, managerViewSingleProjectApi } from '../../../redux/action/managerAction';
import { MilestonesChartByProjectForUserApi } from '../../../redux/action/userAction';
import ManagerViewMilestoneModal from '../../common/modal/managerViewMilestoneModal';
import ManagerAddMilestoneModal from '../../common/modal/managerAddMilestoneModal';
import { managerSelector } from '../../../redux/slice/managerSlice';
import { managerViewMilestoneProjectTableHead } from '../../../utils/constants/userTableData';
import ProjectTaskList from '../ProjectTaskList';
import ProjectApproval from '../ProjectApproval';


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
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [value, setValue] = React.useState(0);


    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const projectRefId = state?.projectRefId;
    const { managerViewSingleProjectDetail, getMilestonesByProjectForManagerDetail } = useSelector(managerSelector);
    console.log(managerViewSingleProjectDetail, "managerViewSingleProjectDetail")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (projectRefId) {
            dispatch(managerViewSingleProjectApi(projectRefId));
            dispatch(getMilestoneByProjectForManagerApi(projectRefId));
            dispatch(MilestonesChartByProjectForUserApi(projectRefId))
        }
    }, [dispatch, projectRefId]);

    const handleAddMilestone = () => {
        setSelectedMilestone({
            projectRefId: projectRefId,
            // milestoneRefId: row.milestone_ref_id,
        });
        setOpen(true);
    }

    const handleActionClick = (action, row) => {
        console.log(row, "row")
        switch (action) {

            // case "view":
            //     navigate("/userDashboard/addMilestones", {
            //         state: { projectRefId: row.project_ref_id },
            //     });
            //     break;

            case "view":
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
                    <Tab label="Project Approval" {...a11yProps(3)} />

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ padding: "16px 0" }}>
                    {managerViewSingleProjectDetail?.data?.category === "Others" ?
                        <>
                            <Box display="flex" justifyContent="flex-end" >
                                <button className="submit-btn" onClick={handleAddMilestone} >Add Milestone</button>
                            </Box>
                        </>
                        : ""
                    }

                    <div style={{ padding: "16px 0" }}>
                        <Box >
                            <ProjectOverviewCard
                                project={{
                                    projectId: managerViewSingleProjectDetail?.data?.project_id,
                                    // progress: 40, // Calculate if needed
                                    // customerName: managerViewSingleProjectDetail?.data?.project_sponsor,
                                    // customerLink: "",
                                    // Category: managerViewSingleProjectDetail?.data?.category,
                                    BusinessUnit: managerViewSingleProjectDetail?.data?.business_unit,
                                    status: managerViewSingleProjectDetail?.data?.status,
                                    dateCreated: managerViewSingleProjectDetail?.data?.created_at?.split("T")[0],
                                    startDate: managerViewSingleProjectDetail?.data?.start_date,
                                    deadline: managerViewSingleProjectDetail?.data?.enddate,
                                    // estimatedHours: "90:00",
                                    Plant: managerViewSingleProjectDetail?.data?.plant,
                                    description: managerViewSingleProjectDetail?.data?.project_description,
                                    projectManager: managerViewSingleProjectDetail?.data?.project_manager,
                                    projectName: managerViewSingleProjectDetail?.data?.project_name,
                                    projectSponsor: managerViewSingleProjectDetail?.data?.project_sponsor,
                                    teamMember: managerViewSingleProjectDetail?.data?.teammembers
                                        ?.map((member) => member.name)
                                        .join(", "),
                                    product: managerViewSingleProjectDetail?.data?.product,
                                }}
                            />
                        </Box>

                    </div>


                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CommonTable
                    columns={managerViewMilestoneProjectTableHead}
                    data={
                        Array.isArray(getMilestonesByProjectForManagerDetail?.data)
                            ? getMilestonesByProjectForManagerDetail?.data
                            : []
                    }
                    onActionClick={handleActionClick}
                />

                <ManagerAddMilestoneModal
                    openModal={open}
                    setOpenModal={() => setOpen(false)}
                    projectRefId={selectedMilestone?.projectRefId ?? projectRefId}
                />

                <ManagerViewMilestoneModal
                    openModal={openUpdate}
                    setOpenModal={() => setOpenUpdate(false)}
                    projectRefId={selectedMilestone?.projectRefId}
                    milestoneRefId={selectedMilestone?.milestoneRefId}
                    milestoneData={selectedMilestone?.milestoneData}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ProjectTaskList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <ProjectApproval
                    project={{
                        status: managerViewSingleProjectDetail?.data?.status,
                        startDate: managerViewSingleProjectDetail?.data?.start_date,
                        deadline: managerViewSingleProjectDetail?.data?.enddate,
                        projectManager: managerViewSingleProjectDetail?.data?.project_manager,
                        projectName: managerViewSingleProjectDetail?.data?.project_name,
                        projectSponsor: managerViewSingleProjectDetail?.data?.project_sponsor,
                        teamMember: managerViewSingleProjectDetail?.data?.teammembers
                            ?.map((member) => member.name)
                            .join(", "),
                        projectRefId: managerViewSingleProjectDetail?.data?.project_ref_id
                    }}

                />
            </CustomTabPanel>

        </Box>
    );
}
