import React, { useEffect, useState } from 'react'
import StatCards from '../../../componenets/common/cards/statCards'
import CommonTable from '../../../componenets/common/Table/commonTable'
import { userProjectListTableHead } from '../../../utils/constants/userTableData'
import { useNavigate } from 'react-router-dom'
import { userProjectListApi, UserProjectStatsApi } from '../../../redux/action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../redux/slice/userSlice'
import { Box, Typography } from '@mui/material'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { handleSesssionStorage } from '../../../utils/helperFunction'

const UserHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userProjectListDetail, overallProjectStatDetail } = useSelector(userSelector)
    const stats = overallProjectStatDetail?.data;

    const Username = handleSesssionStorage("get", "name")

    // const handleAddNewProject = () => {
    //     navigate("/userDashboard/addNewProject")
    // }

    useEffect(() => {

        dispatch(userProjectListApi())

        dispatch(UserProjectStatsApi())

    }, [])

    const handleActionClick = (action, row) => {
        switch (action) {
            case "view":
                navigate("/userDashboard/viewProject", {
                    state: { projectRefId: row.project_ref_id },
                });
                break;
            case "edit":
                navigate(`/userDashboard/editProject/${row.project_ref_id}`);
                break;
            case "delete":
                if (window.confirm(`Are you sure you want to delete "${row.project_name}"?`)) {
                    console.log("DELETE", row);
                }
                break;
            default:
                break;
        }
    };

    const formattedData = userProjectListDetail?.data?.map(item => ({
        ...item,
        "teammembers.name": item.teammembers?.map(member => member.name).join(", "),
    }));

    return (
        <div>
            <Box
                sx={{
                    p: { xs: 2, md: 4 },
                    mb: 4,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #00796b 0%, #7dbdb7 100%)",
                    color: "white",
                    boxShadow: 4,
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                }}
            >
                {/* Left: Welcome Text */}
                <Box>
                    <Typography variant="h4" fontWeight={700} sx={{ textAlign: "left" }}>
                        Welcome, {Username} 👋
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        Track your project progress, manage milestones, and stay updated — all in one place.
                    </Typography>
                    
                </Box>

                {/* Right: Icon */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50%",
                        width: 80,
                        height: 80,
                    }}
                >
                    <EmojiObjectsOutlinedIcon sx={{ fontSize: 40, color: "#fff" }} />
                </Box>
            </Box>

            <Box className="card-container">
                <StatCards title="Total No of Projects" details={{ count: stats?.total_projects }} />
                <StatCards title="Completed Projects" details={{ count: stats?.completed_projects }} />
                <StatCards title="Pending Projects" details={{ count: stats?.incomplete_projects }} />
            </Box>

            <br />
            <CommonTable columns={userProjectListTableHead} data={formattedData} onActionClick={handleActionClick} />
        </div>
    )
}

export default UserHome