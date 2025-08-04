import { useLocation, useNavigate } from 'react-router-dom'
import CommonTable from '../../../componenets/common/Table/commonTable'
import { managerTeamMemberProjectListTableHead } from '../../../utils/constants/userTableData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getManagerTeamMemberProjectListApi } from '../../../redux/action/managerAction'
import { managerSelector } from '../../../redux/slice/managerSlice'

const TeamMemberProjectList = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const projectRefId = state?.projectRefId;


    const { getManagerTeamMemberProjectListDetail } = useSelector(managerSelector);

    useEffect(() => {
        dispatch(getManagerTeamMemberProjectListApi(projectRefId));
    }, []);

    const handleActionClick = (action, row) => {
        switch (action) {
            case "view":
                navigate("/managerDashboard/viewProject", {
                    state: { projectRefId: row.project_ref_id },
                });
                break;
      
        }
    };

    const formattedData = getManagerTeamMemberProjectListDetail?.data || [];

    return (
        <div>

            <CommonTable columns={managerTeamMemberProjectListTableHead} data={formattedData} onActionClick={handleActionClick} />
        </div>
    );
};


export default TeamMemberProjectList