import { useEffect, useState } from "react";
import {
    Box,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Grid,
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
    filterCategoriesForChartApi,
    getManagerTeamMemberApi,
    filterMemberChartApi,
} from "../../../redux/action/managerAction";
import { managerSelector } from "../../../redux/slice/managerSlice";

const categories = [
    { value: "New Process Technology - Sustainable Growth ", label: "New Process Technology - Sustainable Growth " },
    { value: "Capacity enhancement (New lines / P&M) - Sustainable Growth ", label: "Capacity enhancement (New lines / P&M) - Sustainable Growth " },
    { value: "New lines to win New Business - Sustainable Growth", label: "New lines to win New Business - Sustainable Growth" },
    { value: "Model Lines (World Class Manufacturing) - Competitive Advantage ", label: "Model Lines (World Class Manufacturing) - Competitive Advantage " },
    { value: "Industry 4.0 - Competitive Advantage ", label: "Industry 4.0 - Competitive Advantage " },
    { value: "Cost reduction - Profitability ", label: "Cost reduction - Profitability " },
    { value: "Investment reduction - Profitability ", label: "Investment reduction - Profitability " },
    { value: "Manpower reduction - Profitability ", label: "Manpower reduction - Profitability " },
    { value: "New products Introduction - Customer Satisfaction", label: "New products Introduction - Customer Satisfaction" },
    { value: "Process Technology (Q Impr.) - Customer Satisfaction", label: "Process Technology (Q Impr.) - Customer Satisfaction" },
    { value: "AI Project", label: "AI Project" },
    { value: "Quality Improvements", label: "Quality Improvements" },
];

const ChartWithFilter = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const [member, setMember] = useState("");

    const {
        filterCategoriesForChartDetail,
        filterTeamMembersForChartDetail,
        getManagerTeamMemberDetail,
    } = useSelector(managerSelector);

    // Category Chart Data
    const categoryChartData = filterCategoriesForChartDetail?.data
        ? [filterCategoriesForChartDetail.data[0]]
        : [];

    // Member Chart Data
    const memberChartData = filterTeamMembersForChartDetail?.data
        ? [filterTeamMembersForChartDetail.data]
        : [];

    const memberData = getManagerTeamMemberDetail?.data || [];

    // fetch team members on mount
    useEffect(() => {
        dispatch(getManagerTeamMemberApi());
    }, [dispatch]);

    // Set default category
    useEffect(() => {
        if (!category && categories.length > 0) {
            setCategory(categories[0].value);
        }
    }, [category]);

    // Set default member once loaded
    useEffect(() => {
        if (!member && memberData.length > 0) {
            setMember(memberData[0].ref_id);
        }
    }, [member, memberData]);

    // fetch category chart
    useEffect(() => {
        if (category) {
            dispatch(filterCategoriesForChartApi({ category }));
        }
    }, [category, dispatch]);

    // fetch member chart
    useEffect(() => {
        if (member) {
            dispatch(filterMemberChartApi({ member }));
        }
    }, [member, dispatch]);

    // 🔥 Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    sx={{
                        background: "white",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        p: 1.5,
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={600}>
                        {label}
                    </Typography>
                    {payload.map((item, index) => (
                        <Typography key={index} sx={{ fontSize: 13, color: item.fill }}>
                            {item.name}: {item.value}
                        </Typography>
                    ))}
                </Box>
            );
        }
        return null;
    };

    return (
        <Grid container spacing={3}>
            {/* CATEGORY CHART */}
            <Grid item xs={12} md={6}>
                <Card
                    elevation={3}
                    sx={{ borderRadius: 3, p: 2, height: 300, width: "550px", display: "flex", flexDirection: "column", background: "linear-gradient(0deg, #00796b 0%, #26a69a 10%, #e0f7f4 100%)", }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Category Chart
                        </Typography>
                        <FormControl size="small" sx={{ maxWidth: 120 }}>
                            <InputLabel id="category-label">Select Category</InputLabel>
                            <Select
                                labelId="category-label"
                                value={category}
                                label="Select category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Chart */}
                    <Box sx={{ flex: 1 }}>
                        {categoryChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryChartData} barSize={20}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#090909ff" />
                                    <XAxis dataKey="category" tick={{ fontSize: 12,fill: "white" }} />
                                    <YAxis tick={{ fontSize: 12, }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="completed_projects"
                                        fill="#06802bff"
                                        name="Completed"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                    />
                                    <Bar
                                        dataKey="incomplete_projects"
                                        fill="#dd1010f1"
                                        name="Incomplete"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                        animationBegin={300}
                                    />
                                    <Bar
                                        dataKey="total_projects"
                                        fill="#0c50bdea"
                                        name="Total"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                        animationBegin={600}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <Typography align="center" color="text.secondary" mt={6}>
                                No Data Available
                            </Typography>
                        )}
                    </Box>
                </Card>
            </Grid>

            {/* MEMBER CHART */}
            <Grid item xs={12} md={6}>
                <Card
                    elevation={3}
                    sx={{ borderRadius: 3, p: 2, height: 300, width: "550px", display: "flex", flexDirection: "column", background: "linear-gradient(0deg, #00796b 0%, #26a69a 10%, #e0f7f4 100%)", }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Team Member Chart
                        </Typography>
                        <FormControl size="small" sx={{ width: 120 }}>
                            <InputLabel id="member-label">Select Team Member</InputLabel>
                            <Select
                                labelId="member-label"
                                label="Select Team Member"
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                            >
                                {memberData.map((m) => (
                                    <MenuItem key={m.id} value={m.ref_id}>
                                        {m.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Chart */}
                    <Box sx={{ flex: 1 }}>
                        {memberChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={memberChartData} barSize={20}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#090808ff" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12,fill: "white" }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="completed_projects"
                                        fill="#06802bff"
                                        name="Completed"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                    />
                                    <Bar
                                        dataKey="incomplete_projects"
                                        fill="#dd1010f1"
                                        name="Incomplete"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                        animationBegin={300}
                                    />
                                    <Bar
                                        dataKey="total_projects"
                                        fill="#0c50bdea"
                                        name="Total"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={1200}
                                        animationBegin={600}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <Typography align="center" color="text.secondary" mt={6}>
                                No Data Available
                            </Typography>
                        )}
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ChartWithFilter;
