import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const DonutChart = ({ milestones = {} }) => {
    // Status → color mapping
    const STATUS_COLORS = {
        "Completed": "#4caf50",
        "In Progress": "#2196f3",
        "Overdue": "#f44336",
        "Yet to Start": "#ff9800"
    };

    // Convert object to chart data
    const chartData = Object.entries(milestones).map(([status, count]) => ({
        name: status,
        value: count,
        color: STATUS_COLORS[status] || "#607d8b"
    })).filter(item => item.value > 0); // Optional: remove 0-count statuses

    return (
        <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default DonutChart;
