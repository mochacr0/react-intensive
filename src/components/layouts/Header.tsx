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
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { clearAuthTokenPair } from "../../redux/features/tokenSlice";

type NavigationItems = {
    name: string;
    path: string;
};

const navigationItems: NavigationItems[] = [{ name: "Error Page", path: "/error" }];
const accountItems: NavigationItems[] = [{ name: "Account", path: "/account" }];

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

    function handleNagivationItemClicked(headerItem: NavigationItems) {
        handleCloseNavMenu();
        handleCloseUserMenu();
        navigate(headerItem.path);
    }

    return (
        <AppBar position="fixed" className="mb-5">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box className="flex md:hidden">
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
                            {navigationItems.map((headerItem) => (
                                <MenuItem
                                    key={headerItem.path}
                                    onClick={() => {
                                        handleNagivationItemClicked(headerItem);
                                    }}
                                >
                                    <Typography className="text-center">{headerItem.name + "Mobile"}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box className="flex flex-grow items-center justify-center md:hidden">
                        <AdbIcon className="mr-1" />
                        <Link to="/" className="block text-white no-underline">
                            <Typography
                                variant="h5"
                                noWrap
                                className="mr-2 flex-grow font-bold tracking-[.3rem] text-inherit no-underline md:hidden"
                            >
                                LOGO
                            </Typography>
                        </Link>
                    </Box>

                    <Box className="hidden md:flex">
                        <AdbIcon className="mr-1" />
                        <Link to="/" className="text-white no-underline">
                            <Typography
                                variant="h6"
                                noWrap
                                className="mr-2 hidden font-bold tracking-[.3rem] text-inherit no-underline md:flex"
                            >
                                LOGO
                            </Typography>
                        </Link>
                    </Box>

                    <Box className="hidden flex-grow md:flex">
                        {navigationItems.map((headerItem) => (
                            <Link to={headerItem.path} key={headerItem.path}>
                                <Button className="my-2 text-white no-underline" key={headerItem.path}>
                                    {headerItem.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box className="flex-grow-0">
                        {currentUser ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} className="p-0">
                                        <Avatar alt={currentUser?.firstName} src="#" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
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
                                    {accountItems.map((accountItem) => (
                                        <MenuItem
                                            key={accountItem.path}
                                            onClick={() => {
                                                handleNagivationItemClicked(accountItem);
                                            }}
                                        >
                                            <Typography sx={{ px: "16px" }}>{accountItem.name}</Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                        <Typography sx={{ px: "16px" }} onClick={handleLogout}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box>
                                <Link to="/login">
                                    <Button className="my-2 px-6 text-white">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="my-2 text-white">Register</Button>
                                </Link>{" "}
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
