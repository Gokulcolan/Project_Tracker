import { useDispatch, useSelector } from "react-redux";
import ProjectOverviewCard from "../../common/cards/projectOverviewCard"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMilestonesByProjectForUserApi, MilestonesChartByProjectForUserApi, userViewSingleProjectApi } from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";
import AddMilestoneModal from "../../common/modal/managerAddMilestoneModal";
import CommonTable from "../../common/Table/commonTable";
import { managerViewMilestoneProjectTableHead, userViewMilestoneProjectTableHead } from "../../../utils/constants/userTableData";
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { getMilestoneByProjectForManagerApi, managerViewSingleProjectApi } from "../../../redux/action/managerAction";
import { managerSelector } from "../../../redux/slice/managerSlice";
import ManagerAddMilestoneModal from "../../common/modal/managerAddMilestoneModal";
import UserUpdateMilestoneModal from "../../common/modal/userUpdateMilestoneModal";
import ManagerViewMilestoneModal from "../../common/modal/managerViewMilestoneModal";

const ProjectOverview = ({ project }) => {
    const { state } = useLocation();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const projectRefId = state?.projectRefId;
    const { managerViewSingleProjectDetail, getMilestonesByProjectForManagerDetail } = useSelector(managerSelector);

    console.log(managerViewSingleProjectDetail, "managerViewSingleProjectDetail")

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

    // const formattedData = managerViewSingleProjectDetail?.data?.map(item => ({
    //     ...item,
    //     "teammembers.name": item.teammembers?.map(member => member.name).join(", "),
    // }));
    // console.log(formattedData,"formattedData")

    return (
        <div>
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
                            progress: 40, // Calculate if needed
                            customerName: managerViewSingleProjectDetail?.data?.project_sponsor,
                            customerLink: "",
                            billingType: managerViewSingleProjectDetail?.data?.category,
                            totalRate: managerViewSingleProjectDetail?.data?.business_unit,
                            status: "In Progress",
                            dateCreated: managerViewSingleProjectDetail?.data?.created_at?.split("T")[0],
                            startDate: managerViewSingleProjectDetail?.data?.start_date,
                            deadline: managerViewSingleProjectDetail?.data?.enddate,
                            estimatedHours: "90:00",
                            loggedHours: managerViewSingleProjectDetail?.data?.plant,
                            description: managerViewSingleProjectDetail?.data?.project_description,
                            projectManager: managerViewSingleProjectDetail?.data?.project_manager,
                            projectName: managerViewSingleProjectDetail?.data?.project_name,
                            projectSponsor: managerViewSingleProjectDetail?.data?.project_sponsor,
                            // teamMember: managerViewSingleProjectDetail?.data?.teammember?.map((val, i) => val.name),
                            teamMember: managerViewSingleProjectDetail?.data?.teammembers?.map((member) => member.name),
                            product: managerViewSingleProjectDetail?.data?.product,
                        }}
                    />
                </Box>

            </div>

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

        </div>
    )
}

export default ProjectOverview