import { Box } from '@mui/material'
import  { useEffect, useState } from 'react'
import UserAddNewTaskModal from '../../common/modal/userAddNewTaskModal'
import CommonTable from '../../common/Table/commonTable';
import { userTaskListTableHead } from '../../../utils/constants/userTableData';
import { useLocation } from 'react-router-dom';
import { getTaskListByProjectForUserApi } from '../../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../redux/slice/userSlice';

const AddNewTask = () => {

    const { state } = useLocation();
    const dispatch = useDispatch()
    
    const projectRefId = state?.projectRefId;
    const [open, setOpen] = useState(false);
    const { getTaskListByProjectForUserDetail } = useSelector(userSelector)

    const handleAddNewTask = () => {
        setOpen(true)
    }

    useEffect(() => {
        dispatch(getTaskListByProjectForUserApi(projectRefId))
    }, [])

    const formattedData = getTaskListByProjectForUserDetail?.data?.map(item => ({
        ...item,
        "tasks.task_name": (
            <ul style={{ paddingLeft: 16, margin: 0 }}>
                {item.tasks?.map((t, i) => <li key={i}>{t.task_name}</li>)}
            </ul>
        ),
        "tasks.date": (
            <ul style={{ paddingLeft: 16, margin: 0 }}>
                {item.tasks?.map((t, i) => <li key={i}>{t.date}</li>)}
            </ul>
        ),
        "tasks.description": (
            <ul style={{ paddingLeft: 16, margin: 0 }}>
                {item.tasks?.map((t, i) => <li key={i}>{t.description}</li>)}
            </ul>
        ),
    }));

    return (
        <div>
            <Box display="flex" justifyContent="flex-end">
                <button onClick={handleAddNewTask} className="submit-btn">+ Add New Task</button>
            </Box>
            <CommonTable columns={userTaskListTableHead} data={formattedData} />
            <UserAddNewTaskModal
                openModal={open}
                setOpenModal={() => setOpen(false)}
                projectRefId={projectRefId}
            />
        </div>
    )
}

export default AddNewTask