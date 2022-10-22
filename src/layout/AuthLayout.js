import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import NAVLINKS from "../configs/dummies/navlinks";
import Authentication from '../utils/Authentication';
import { AuthCtx } from '../configs/context/AuthContext';


const drawerWidth = 240;

function AuthLayout(props) {
    const auth = useContext(AuthCtx);
    const { logout } = Authentication();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {NAVLINKS.filter((nav) => (
                    auth.isLoggedIn ? nav.type === 'private' || nav.type === 'hybrid' : nav.type === 'public' || nav.type === 'hybrid'
                )).map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: "left" }} href={item.path}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem key={'logout'} disablePadding>
                    <ListItemButton onClick={logout} sx={{ textAlign: "left" }} >
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <AppBar component="nav">
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                            MUI
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {NAVLINKS.filter((nav) => (
                                auth.isLoggedIn ? nav.type === 'private' || nav.type === 'hybrid' : nav.type === 'public' || nav.type === 'hybrid'
                            )).map((item) => (
                                <Button key={item.id} sx={{ color: "#fff" }} href={item.path}>
                                    {item.title}
                                </Button>
                            ))}
                            <Button key="logout"
                                onClick={logout}
                                variant="contained"
                                sx={{ bgcolor: 'white', color: 'primary.main', ml: 2 }}>
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}>
                    {drawer}
                </Drawer>
            </Box>
            <main>
                <Box sx={{ height: '100vh' }}>
                    <Container maxWidth='lg' sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Outlet />
                    </Container>
                </Box>
            </main>
        </React.Fragment>
    );
}

AuthLayout.propTypes = {
    window: PropTypes.func,
};

export default AuthLayout;
