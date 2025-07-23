// import { useDispatch, useSelector } from "react-redux";
// import ProjectOverviewCard from "../../common/cards/projectOverviewCard"
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getMilestonesByProjectForUserApi, MilestonesChartByProjectForUserApi, userViewSingleProjectApi } from "../../../redux/action/userAction";
// import { userSelector } from "../../../redux/slice/userSlice";
// import AddMilestoneModal from "../../common/modal/managerAddMilestoneModal";
// import CommonTable from "../../common/Table/commonTable";
// import { userViewMilestoneProjectTableHead } from "../../../utils/constants/userTableData";
// import UpdateMilestoneModal from "../../common/modal/userUpdateMilestoneModal";
// import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
// import UserAddMilestoneModal from "../../common/modal/userAddMileStoneModal";
// import UserUpdateMilestoneModal from "../../common/modal/userUpdateMilestoneModal";

// const ProjectOverview = ({ project }) => {
//     const { state } = useLocation();
//     const dispatch = useDispatch()
//     const [open, setOpen] = useState(false);
//     const [openUpdate, setOpenUpdate] = useState(false);

//     const [selectedMilestone, setSelectedMilestone] = useState(null);
//     const projectRefId = state?.projectRefId;
//     const { userViewSingleProjectDetail, getMilestonesByProjectForUserDetail } = useSelector(userSelector);
    
//     useEffect(() => {
//         if (projectRefId) {
//             dispatch(userViewSingleProjectApi(projectRefId));
//             dispatch(getMilestonesByProjectForUserApi(projectRefId));
//             dispatch(MilestonesChartByProjectForUserApi(projectRefId))
//         }
//     }, [dispatch, projectRefId]);

//     // const handleAddMilestone = () => {
//     //     setSelectedMilestone({
//     //         projectRefId: projectRefId,
//     //         // milestoneRefId: row.milestone_ref_id,
//     //     });
//     //     setOpen(true);
//     // }

//     const handleActionClick = (action, row) => {
//         switch (action) {

//             case "view":
//                 // if (row.status === null) {
//                     setSelectedMilestone({
//                         projectRefId: projectRefId,
//                         milestoneRefId: row.milestone_ref_id,
//                         milestoneData: row,
//                     });
//                     setOpen(true);
//                 // } else {
//                 //     alert("Set Milestone is Already Completed now you are not able to view.");
//                 // }
//                 break;  
//             case "edit":
//                 setSelectedMilestone({
//                     projectRefId: projectRefId,
//                     milestoneRefId: row.milestone_ref_id,
//                     milestoneData: row,
//                 });
//                 setOpenUpdate(true);
//                 break;
//             // case "delete":
//             //     if (window.confirm(`Are you sure you want to delete "${row.project_name}"?`)) {
//             //         console.log("DELETE", row);
//             //         // dispatch(deleteProjectApi(row.id))
//             //     }
//             //     break;
//             default:
//                 break;
//         }
//     };

//     return (
//         <div>
//             {/* <Box display="flex" justifyContent="flex-end" >
//                 <button className="submit-btn" onClick={handleAddMilestone} >Add Milestone</button>
//             </Box> */}
//             <div style={{ padding: "16px 0" }}>
//                 <Box >
//                     <ProjectOverviewCard
//                         project={{
//                             projectId: userViewSingleProjectDetail?.data?.project_id,
//                             progress: 40, // Calculate if needed
//                             customerName: userViewSingleProjectDetail?.data?.project_sponsor,
//                             customerLink: "",
//                             billingType: userViewSingleProjectDetail?.data?.category,
//                             totalRate: userViewSingleProjectDetail?.data?.business_unit,
//                             status: "In Progress",
//                             dateCreated: userViewSingleProjectDetail?.data?.created_at?.split("T")[0],
//                             startDate: userViewSingleProjectDetail?.data?.start_date,
//                             deadline: userViewSingleProjectDetail?.data?.enddate,
//                             estimatedHours: "90:00",
//                             loggedHours: userViewSingleProjectDetail?.data?.plant,
//                             description: userViewSingleProjectDetail?.data?.project_description,
//                             projectManager: userViewSingleProjectDetail?.data?.project_manager,
//                             projectName: userViewSingleProjectDetail?.data?.project_name,
//                             projectSponsor: userViewSingleProjectDetail?.data?.project_sponsor,
//                             teamMember: userViewSingleProjectDetail?.data?.teammember,
//                             product: userViewSingleProjectDetail?.data?.product,
//                         }}
//                     />
//                 </Box>

//             </div>

//             <CommonTable
//                 columns={userViewMilestoneProjectTableHead}
//                 data={
//                     Array.isArray(getMilestonesByProjectForUserDetail?.data)
//                         ? getMilestonesByProjectForUserDetail.data
//                         : []
//                 }
//                 onActionClick={handleActionClick}
//             />

//             <UserAddMilestoneModal
//                 openModal={open}
//                 setOpenModal={() => setOpen(false)}
//                 projectRefId={selectedMilestone?.projectRefId}
//                 milestoneRefId={selectedMilestone?.milestoneRefId}
//                 milestoneData={selectedMilestone?.milestoneData}
//             />

//             <UserUpdateMilestoneModal
//                 openModal={openUpdate}
//                 setOpenModal={() => setOpenUpdate(false)}
//                 projectRefId={selectedMilestone?.projectRefId}
//                 milestoneRefId={selectedMilestone?.milestoneRefId}
//                 milestoneData={selectedMilestone?.milestoneData}
//             />


//         </div>
//     )
// }

// export default ProjectOverview