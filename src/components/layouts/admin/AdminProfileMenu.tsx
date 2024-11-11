import Logout from "@mui/icons-material/Logout";
import { ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { useCurrentUserContext } from "../../../providers/CurrentUserProvider";
import { clearAuthTokenPair } from "../../../redux/features/tokenSlice";

const AdminProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { currentUser, setCurrentUser } = useCurrentUserContext();

    function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleLogout() {
        dispatch(clearAuthTokenPair());
        setCurrentUser(null);
        navigate("/login");
        handleCloseMenu();
    }

    const isMenuOpen = Boolean(anchorEl);

    return (
        <>
            <Tooltip title="Account settings" arrow>
                <IconButton
                    onClick={handleOpenMenu}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={isMenuOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? "true" : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleCloseMenu}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    divider
                    sx={{
                        "&:hover": { backgroundColor: "white" },
                        pointerEvents: "none",
                        opacity: 1,
                        color: "text.primary",
                    }}
                >
                    <ListItemText sx={{ textAlign: "right" }}>{`Hi, ${currentUser?.firstName}`}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AdminProfileMenu;
