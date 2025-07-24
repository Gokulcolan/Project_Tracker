import React, { useEffect } from 'react'
import CommonTable from '../../common/Table/commonTable'
import { managerTaskListTableHead } from '../../../utils/constants/userTableData'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { managerSelector } from '../../../redux/slice/managerSlice';
import { getTaskListByProjectForManagerApi } from '../../../redux/action/managerAction';

const ProjectTaskList = () => {
  const { state } = useLocation();
  const dispatch = useDispatch()
  const projectRefId = state?.projectRefId;
  const { getTaskListByProjectForManagerDetail } = useSelector(managerSelector)

  useEffect(() => {
    dispatch(getTaskListByProjectForManagerApi(projectRefId))
  }, [])

  // const formattedData = getTaskListByProjectForManagerDetail?.data?.map(item => ({
  //   ...item,
  //   "tasks.task_name": item.tasks?.map(member => member.task_name).join(", "),
  //   "tasks.date": item.tasks?.map(val => val.date).join(", "),
  //   "tasks.description": item.tasks?.map(val => val.description).join(", "),
  // }));

  const formattedData = getTaskListByProjectForManagerDetail?.data?.map(item => ({
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
    "tasks.assigned_user_name": (
      <ul style={{ paddingLeft: 16, margin: 0 }}>
        {item.tasks?.map((t, i) => <li key={i}>{t.assigned_user_name}</li>)}
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
      <CommonTable columns={managerTaskListTableHead} data={formattedData} />
    </div>
  )
}

export default ProjectTaskList