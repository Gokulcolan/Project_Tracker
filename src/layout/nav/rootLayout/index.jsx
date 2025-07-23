import React, { useState } from "react";
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
        // handleSesssionStorage("remove", "ur");
        // localStorage.clear();
        // dispatch(logout()); // VERY important
        // navigate("/", { replace: true }); // Prevents browser back to protected page
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen); // Toggle the sidebar open state
    };

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
                            sx={{ color: "#00796b", mr: 2 }}
                        >
                            <Badge badgeContent={7} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

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