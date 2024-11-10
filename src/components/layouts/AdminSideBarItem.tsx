import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { RegularSideBarItem as SideBarItemProps } from "../../models/sideBarModels";

const AdminSideBarItem: React.FC<SideBarItemProps> = ({ name, icon, url }) => {
    return (
        // <NavLink
        //     to={url}
        //     style={{ textDecoration: "none" }}
        //     end
        //     //   activeclassname="active"
        // >
        <ListItemButton
            className="linkBtn"
            sx={{
                "&:hover": { backgroundColor: "#172032" },
                paddingY: "8px",
                paddingX: "24px",
            }}
        >
            <ListItemIcon sx={{ color: "#949ca9" }}>{icon}</ListItemIcon>
            <ListItemText primary={name} sx={{ ml: "-10px", color: "#949ca9" }} />
        </ListItemButton>
        // </NavLink>
    );
};

export default AdminSideBarItem;
