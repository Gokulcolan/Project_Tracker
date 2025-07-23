import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMilestonesByProjectForUserApi } from '../../../redux/action/userAction';
import CommonTable from '../../common/Table/commonTable';
import { userSelector } from '../../../redux/slice/userSlice';
import { userViewMilestoneProjectTableHead } from '../../../utils/constants/userTableData';
import UpdateMilestoneModal from '../../common/modal/userUpdateMilestoneModal';
import UserUpdateMilestoneModal from '../../common/modal/userUpdateMilestoneModal';

const ViewMilestone = () => {
    const dispatch = useDispatch()
    const { state } = useLocation();
    const projectRefId = state?.projectRefId;
    const { getMilestonesByProjectForUserDetail } = useSelector(userSelector);
    const [open, setOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    useEffect(() => {
        dispatch(getMilestonesByProjectForUserApi(projectRefId))
    }, [])

    const handleActionClick = (action, row) => {
        console.log(row, "row")
        switch (action) {
            // case "view":
            //     navigate("/userDashboard/addMilestones", {
            //         state: { projectRefId: row.project_ref_id },
            //     });
            //     break;
            case "edit":
                setSelectedMilestone({
                    projectRefId: projectRefId,
                    milestoneRefId: row.milestone_ref_id,
                });
                setOpen(true);
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
        <>
            <div>
                <h2 style={{ textTransform: "uppercase" }}>Project name - {getMilestonesByProjectForUserDetail?.data?.project_name} </h2>
                <CommonTable columns={userViewMilestoneProjectTableHead} data={getMilestonesByProjectForUserDetail?.data?.milestones} onActionClick={handleActionClick} />
            </div>
            <UserUpdateMilestoneModal
                openModal={open}
                setOpenModal={() => setOpen(false)}
                projectRefId={selectedMilestone?.projectRefId}
                milestoneRefId={selectedMilestone?.milestoneRefId}
            />
        </>

    )
}

export default ViewMilestone