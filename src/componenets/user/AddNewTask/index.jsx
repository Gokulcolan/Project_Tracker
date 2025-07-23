import { Box } from '@mui/material'
import React, { useState } from 'react'
import UserAddNewTaskModal from '../../common/modal/userAddNewTaskModal'
import CommonTable from '../../common/Table/commonTable';
import { userTaskListTableHead } from '../../../utils/constants/userTableData';
import { useLocation } from 'react-router-dom';

const AddNewTask = () => {
    const { state } = useLocation();
    const projectRefId = state?.projectRefId;
    console.log(projectRefId, "projectRefId")
    const [open, setOpen] = useState(false);

    const handleAddNewTask = () => {
        setOpen(true)
    }

    return (
        <div>
            <Box display="flex" justifyContent="flex-end">
                <button onClick={handleAddNewTask} className="submit-btn">+ Add New Task</button>
            </Box>
            <CommonTable columns={userTaskListTableHead} />
            <UserAddNewTaskModal
                openModal={open}
                setOpenModal={() => setOpen(false)}
                projectRefId={projectRefId}
                // milestoneRefId={""}
                // milestoneData={""}
            />


        </div>
    )
}

export default AddNewTask