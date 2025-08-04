import { useNavigate } from 'react-router-dom'
import CommonTable from '../../../componenets/common/Table/commonTable'
import { userProjectListTableHead } from '../../../utils/constants/userTableData'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../redux/slice/userSlice'
import { userProjectListApi } from '../../../redux/action/userAction'
import { useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'

const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userProjectListDetail } = useSelector(userSelector);

    useEffect(() => {
        dispatch(userProjectListApi());
    }, []);

    const handleActionClick = (action, row) => {
        switch (action) {
            case "view":
                navigate("/userDashboard/viewProject", {
                    state: { projectRefId: row.project_ref_id },
                });
                break;
       
        }
    };
    const formattedData = userProjectListDetail?.data?.map(item => ({
        ...item,
        "teammembers.name": item.teammembers?.map(member => member.name).join(", "),
    }));

    return (
        <div>
            {/* <Box display="flex" justifyContent="flex-end" mt={2}>
                <button onClick={handleAddNewProject} className="submit-btn">+ Add New Project</button>
            </Box> */}
            <CommonTable columns={userProjectListTableHead} data={formattedData} onActionClick={handleActionClick} />
        </div>
    );
};


export default ProjectList