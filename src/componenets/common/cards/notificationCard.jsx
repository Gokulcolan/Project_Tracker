// components/NotificationCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const NotificationCard = ({ title, message, timestamp, isRead, onClick }) => {
  return (
    
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{
        mb: 0.8,
        background: isRead
          ? "linear-gradient(135deg, #eceff1, #cfd8dc)"   // Read = muted grey-blue
          : "linear-gradient(135deg, #c8e6c9, #68c76bff)", // Unread = darker greenish highlight
        borderLeft: isRead
          ? "4px solid #90a4ae"  // Read = neutral grey border
          : "6px solid #2e7d32", // Unread = dark green border
        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        '&:hover': {
          boxShadow: "0px 3px 12px rgba(0,0,0,0.2)",
          transform: "translateY(-1px)",
          background: isRead
            ? "linear-gradient(135deg, #e0e0e0, #b0bec5)"
            : "linear-gradient(135deg, #a5d6a7, #81c784)"
        }
      }}

    >
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Box display="flex" alignItems="center" mb={0.3}>
          <Box
            sx={{
              backgroundColor: isRead ? "#e0e0e0" : "#b2dfdb",
              borderRadius: "50%",
              p: 0.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 0.8
            }}
          >
            <NotificationsActiveIcon
              sx={{ fontSize: 16, color: isRead ? "#757575" : "#004d40", backgroundColor: "white", borderRadius: "50%", }}
            />
          </Box>
          <Typography variant="body2" fontWeight={600} sx={{ flexGrow: 1, fontSize: 13, color: "#004d40" }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#00695c", display: "block", lineHeight: 1.2 }}>
          {message}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 9, color: "#004d40" }}>
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
