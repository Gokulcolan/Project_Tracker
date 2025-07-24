import React, { useEffect } from 'react'
import StatCards from '../../../componenets/common/cards/statCards'
import CommonTable from '../../../componenets/common/Table/commonTable'
import { managerProjectListTableHead } from '../../../utils/constants/userTableData'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { handleSesssionStorage } from '../../../utils/helperFunction'
import { getAllProjectListApi } from '../../../redux/action/managerAction'
import { managerSelector } from '../../../redux/slice/managerSlice'

const ManagerHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { managerProjectListDetail } = useSelector(managerSelector)

  console.log(managerProjectListDetail, "managerProjectListDetail")

  const Username = handleSesssionStorage("get", "name")

  const handleAddNewProject = () => {
    navigate("/managerDashboard/addNewProject")
  }

  useEffect(() => {
    dispatch(getAllProjectListApi())
  }, [])

  const handleActionClick = (action, row) => {
    switch (action) {
      case "view":
        navigate("/managerDashboard/viewProject", {
          state: { projectRefId: row.project_ref_id },
        });
        break;
      case "edit":
        navigate(`/managerDashboard/editProject/${row.project_ref_id}`);
        break;
      case "delete":
        if (window.confirm(`Are you sure you want to delete "${row.project_name}"?`)) {
          console.log("DELETE", row);
          // dispatch(deleteProjectApi(row.id))
        }
        break;
      default:
        break;
    }
  };

  const formattedData = managerProjectListDetail?.data?.map(item => ({
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
          {/* <Typography variant="caption" mt={1} display="block" sx={{ opacity: 0.9 }}>
                        {dayjs().format("dddd, MMMM D, YYYY")}
                    </Typography> */}
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

      <div className="card-container">
        <StatCards
          title="Total No of Projects"
          details={{
            count: 10,
          }}
        />
        <StatCards
          title="Completed Projects"
          details={{
            count: 8,
          }}
        />
        <StatCards
          title="Pending Projects"
          details={{
            count: 2,
          }}
        />
      </div>
      <br />

      {/* <button className="submit-btn" onClick={handleAddNewProject}> + Add New Project</button> */}

      <Box display="flex" justifyContent="flex-end">
        <button onClick={handleAddNewProject} className="submit-btn">+ Add New Project</button>
      </Box>

      <CommonTable columns={managerProjectListTableHead} data={formattedData} onActionClick={handleActionClick} />
      
    </div>
  )
}

export default ManagerHome
