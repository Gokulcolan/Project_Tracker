import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminmenuItems, ManagermenuItems, UsermenuItems } from "../../../utils/constants/menuItems";
import MuiDrawer from "@mui/material/Drawer";
import logo from "../../../assets/images/tvs-lucas-logo.png";
import { Typography, Box, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { handleSesssionStorage } from "../../../utils/helperFunction";

const drawerWidth = 280;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#00796b",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `0px`, // Set width to 0px for fully closed state
    [theme.breakpoints.up("sm")]: {
        width: `0px`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

function MultipleList({ menuItems }) {
    const { name, path, isNested } = menuItems;
    const navigate = useNavigate();
    const location = useLocation();
    const [openSubMenus, setOpenSubMenus] = useState({});

    const handleClick = (e) => {
        e.preventDefault();
        navigate(path);
    };
    const handleSubMenuToggle = (path) => {
        setOpenSubMenus(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const renderMenuItem = (item, index) => {
        const { name, path, icon, subMenu } = item;
        const isActive = location.pathname === path;
        const hasSubMenu = subMenu && subMenu.length > 0;
        const isSubMenuOpen = openSubMenus[path];

        return (
            <React.Fragment key={index}>
                <ListItemButton
                    component={hasSubMenu ? 'div' : Link}
                    to={hasSubMenu ? undefined : path}
                    onClick={hasSubMenu ? () => handleSubMenuToggle(path) : undefined}
                    style={{
                        backgroundColor: isActive ? "white" : "",
                        color: isActive ? "black" : "white",
                        margin: isActive ? "10px 10px" : "5px 5px",
                        borderRadius: isActive ? "10px" : "",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ margin: "5px 10px" }}>{icon}</span>
                    <ListItemText
                        primary={
                            <Typography variant="body1" sx={{ fontWeight: "600" }}>
                                {name}
                            </Typography>
                        }
                    />
                    {hasSubMenu && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                {hasSubMenu && (
                    <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {subMenu.map((subItem, subIndex) => {
                                const isSubItemActive = location.pathname === subItem.path;
                                return (
                                    <ListItemButton
                                        key={subIndex}
                                        component={Link}
                                        to={subItem.path}
                                        style={{
                                            backgroundColor: isSubItemActive ? "white" : "",
                                            color: isSubItemActive ? "black" : "white",
                                            margin: isSubItemActive ? "10px 10px 10px 30px" : "5px 5px 5px 30px",
                                            borderRadius: isSubItemActive ? "10px" : "",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <span style={{ margin: "5px 10px" }}>{subItem.icon}</span>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                                                    {subItem.name}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    return (

        <>
            {name && (
                <ListItemButton component={Link} to={path} onClick={handleClick}>
                    <ListItemText primary={name} />
                </ListItemButton>
            )}
            {isNested && (
                <List component="div">
                    {isNested.map((nestedItem, index) => renderMenuItem(nestedItem, index))}
                </List>
            )}
        </>
    );
}

export const Layout = ({ open }) => {
    const [layoutData, setLayoutData] = useState([]);

    useEffect(() => {
        const UserRole = parseInt(handleSesssionStorage("get", "ur"), 10);
        if (UserRole === 1) {
            setLayoutData(AdminmenuItems);
        } else if (UserRole === 2) {
            setLayoutData(ManagermenuItems);
        }
        else if (UserRole === 3) {
            setLayoutData(UsermenuItems);
        }
        else {
            setLayoutData([]);
        }
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar Drawer */}
            <Drawer variant="permanent" open={open}>
                <img
                    src={logo}
                    className="logo"
                    style={{ width: "100%", height: "40px", padding: "12px 0px", backgroundColor: "#f8f9fa", boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.1) " }}
                    alt="Company Logo"
                />
                <List>
                    {layoutData.map((items, index) => (
                        <MultipleList menuItems={items} key={index} />
                    ))}
                </List>
                {/* Copyright Message at the Bottom */}
                <Box sx={{ position: "absolute", bottom: 0, width: "100%", padding: "10px 0px", color: "black", backgroundColor: "#f7ed91", textAlign: "center", fontSize: "12px", }}>
                    <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                        &copy; {new Date().getFullYear()} PED-AI Team. All Rights Reserved.
                    </Typography>
                </Box>
            </Drawer>
        </Box>
    );
}