// components/NotificationCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const NotificationCard = ({ title, message, timestamp }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: "#e0f2f1",
        borderLeft: "5px solid #00796b",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
        cursor: "pointer",
        '&:hover': {
          backgroundColor: "#d0ece7",
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <NotificationsActiveIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2">{message}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
