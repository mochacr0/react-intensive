import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { clearAuthTokenPair } from "../../redux/features/tokenSlice";

const pages = ["Products"];

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { currentUser, setCurrentUser } = useCurrentUserContext();

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    }

    function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElUser(event.currentTarget);
    }

    function handleCloseNavMenu() {
        setAnchorElNav(null);
    }

    function handleCloseUserMenu() {
        setAnchorElUser(null);
    }

    function handleLogout() {
        dispatch(clearAuthTokenPair());
        setCurrentUser(null);
        navigate("/login");
    }

    return (
        <AppBar position="static" className="mb-5">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon className="mr-1 hidden md:flex" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        className="mr-2 hidden font-bold tracking-[.3rem] text-inherit no-underline md:flex"
                    >
                        LOGO
                    </Typography>

                    <Box className="flex flex-grow md:hidden">
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            className="block md:hidden"
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography className="text-center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon className="mr-1 flex md:hidden" />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        className="mr-2 flex flex-grow font-bold tracking-[.3rem] text-inherit no-underline md:hidden"
                    >
                        LOGO
                    </Typography>
                    <Box className="hidden flex-grow md:flex">
                        {pages.map((page) => (
                            <Button className="my-2 block text-white" key={page} onClick={handleCloseNavMenu}>
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box className="flex-grow-0">
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} className="p-0">
                                <Avatar alt={currentUser?.firstName} src="#" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                <Typography sx={{ px: "16px" }} onClick={handleLogout}>
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
