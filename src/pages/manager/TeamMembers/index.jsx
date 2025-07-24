import { useDispatch, useSelector } from 'react-redux'
import { managerSelector } from '../../../redux/slice/managerSlice'
import ManagerTeamMembersCard from '../../../componenets/common/cards/managerTeamMemberCard'
import { useEffect, useState } from 'react'
import { getManagerTeamMemberListApi } from '../../../redux/action/managerAction'
import ManagerAddNewEmployeeModal from '../../../componenets/common/modal/managerAddEmployeeModal'
import { Box, Typography } from '@mui/material'

const ManagerTeamMembers = () => {
  const [open, setOpen] = useState(false);
  const { getManagerTeamMemberListDetail } = useSelector(managerSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getManagerTeamMemberListApi())
  }, [])

  const handleAddMember = () => {
    setOpen(true)
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight={700}>
          👥 My Team Members
        </Typography>
        <button className="submit-btn" onClick={handleAddMember}>+ Add New TeamMember</button>
      </Box>
      <ManagerTeamMembersCard data={getManagerTeamMemberListDetail?.data || []} />
      <ManagerAddNewEmployeeModal
        openModal={open}
        setOpenModal={() => setOpen(false)}
      />
    </div>
  )
}

export default ManagerTeamMembers