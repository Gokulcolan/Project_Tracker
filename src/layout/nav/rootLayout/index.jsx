import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Badge, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu"; // Import the Menu Icon
import { Outlet, useNavigate } from "react-router-dom";
import { handleSesssionStorage } from "../../../utils/helperFunction";
import { useDispatch } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Layout } from "./layout";
import { logout } from "../../../redux/slice/authSlice";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationCard from "../../../componenets/common/cards/notificationCard";
import socket from "../../../socket";
import axios from "axios";
import { ADMIN_BASE_URL } from "../../../redux/api/configURL";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
    }),
    ...(!open && {
        width: `calc(100% - 0px)`,
        marginLeft: `0px`,
    }),
}));

export default function RootLayout() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(true); // Sidebar open state
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        handleSesssionStorage("remove", "ur");
        localStorage.clear();
        dispatch(logout()); // VERY important
        navigate("/", { replace: true }); // Prevents browser back to protected page
    };

    const handleEditProfile = () => {
        navigate("/editProfile")
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen); // Toggle the sidebar open state
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    useEffect(() => {
        const userData = handleSesssionStorage("get", "user");
        let user = null;

        try {
            user = userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("❌ Failed to parse user data from sessionStorage:", error);
        }

        // 👇 Socket join should happen as early as possible
        if (user?.id) {
            socket.emit("join", { user_id: user.id });
        }

        const fetchNotifications = async () => {
            try {
                const token = handleSesssionStorage("get", "token");
                const res = await axios.get(`${ADMIN_BASE_URL}/api/notifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setNotifications(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        };

        fetchNotifications();

        // ✅ Real-time notification listener
        socket.on("notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
        });

        // Cleanup
        return () => {
            socket.off("notification");
        };
    }, []);


    return (
        <Box sx={{ display: "flex", position: "relative" }}>
            <AppBar
                position="fixed"
                open={drawerOpen}
                sx={{
                    // height: "74px",
                    backgroundColor: "#f8f9fa",

                    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)"

                }}
            >
                <Toolbar>
                    {/* Menu Button for Toggling Sidebar */}
                    <IconButton
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ marginRight: 2, backgroundColor: "#00796b" }}
                    >
                        <MenuIcon sx={{ color: "white" }} />
                    </IconButton>
                    <h2
                        style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            textTransform: "uppercase",
                            color: "Black",
                            fontSize: "34px",
                            margin: 0,
                            fontWeight: "bold",
                            display: "inline-block",
                            // paddingBottom: "5px",
                            borderBottom: "4px solid transparent",
                            // borderImage: "linear-gradient(to right, #ff900a, #7b2ff7, #119d4c)",
                            borderImageSlice: 1,
                        }}
                    >
                        PED - Project Tracker
                    </h2>
                    {/* Right-side container for Notification & Avatar */}
                    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                        <IconButton
                            size="large"
                            aria-label="show notifications"
                            onClick={handleNotificationClick}
                            sx={{ color: "#00796b", mr: 2 }}
                        >
                            <Badge badgeContent={notifications.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <Menu
                            anchorEl={notificationAnchorEl}
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    width: 330,
                                    maxHeight: 400,
                                    mt: 1.5,
                                    borderRadius: 2,
                                    p: 1,
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            {notifications.length === 0 ? (
                                <Typography textAlign="center" p={2}>
                                    No new notifications
                                </Typography>
                            ) : (
                                notifications.map((notif, index) => (
                                    <NotificationCard
                                        key={index}
                                        title={notif.title}
                                        message={notif.message}
                                        timestamp={notif.timestamp || "Just now"}
                                    />
                                ))
                            )}
                        </Menu>


                        <Avatar
                            sx={{ cursor: "pointer", backgroundColor: "#00796b" }}
                            onClick={handleProfileClick}
                        >
                            <AccountCircleIcon sx={{ fontSize: "40px" }} />
                        </Avatar>
                    </Box>



                    <Menu
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        sx={{ borderRadius: "10px" }}
                        open={Boolean(anchorEl)}
                    >
                        <MenuItem
                            onClick={handleEditProfile}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#c4cdd5",
                                    fontSize: "16px !important", // `!important` usually unnecessary in MUI
                                },
                            }}
                        >
                            Edit Profile
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogOut}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#c4cdd5",
                                    fontSize: "16px !important", // `!important` usually unnecessary in MUI
                                },
                            }}
                        >
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Layout open={drawerOpen} />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}

