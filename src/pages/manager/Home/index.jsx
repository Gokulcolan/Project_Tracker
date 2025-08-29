import React, { useEffect } from 'react'
import StatCards from '../../../componenets/common/cards/statCards'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { handleSesssionStorage } from '../../../utils/helperFunction'
import { getAllProjectListApi } from '../../../redux/action/managerAction'
import { UserProjectStatsApi } from '../../../redux/action/userAction'
import { userSelector } from '../../../redux/slice/userSlice'
import ChartWithFilter from '../../../componenets/manager/FilterCategories/ChartWithFilter'

const ManagerHome = () => {
  const dispatch = useDispatch()
  const { overallProjectStatDetail } = useSelector(userSelector)

  const stats = overallProjectStatDetail?.data;
  const Username = handleSesssionStorage("get", "name")

  useEffect(() => {
    dispatch(getAllProjectListApi())
    dispatch(UserProjectStatsApi())
  }, [])

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
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ textAlign: "left" }}>
            Welcome, {Username} 👋
          </Typography>
          <Typography variant="body1" mt={1}>
            Track your project progress, manage milestones, and stay updated — all in one place.
          </Typography>
        </Box>
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

      <ChartWithFilter />

    </div>
  )
}

export default ManagerHome
