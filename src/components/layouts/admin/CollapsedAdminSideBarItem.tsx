import styled from "@emotion/styled";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CollapsedSideBarItem as CollapsedSideBarItemProps } from "../../../models/sideBarModels";

const CollapsedAdminSidebarItem: React.FC<CollapsedSideBarItemProps> = ({ name, icon, subPaths }) => {
    const [open, setOpen] = React.useState(false);
    const currentPath = useLocation().pathname;

    useEffect(() => {
        subPaths.forEach((subPath) => {
            if (currentPath === subPath.url) {
                setOpen(true);
            }
        });
    }, [currentPath, subPaths]);

    const CustomListItemText = styled(ListItemText)({
        fontSize: "10px !important",
        position: "relative",
        "&::before": {
            content: '""',
            position: "absolute",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            border: "2px solid #027edd",
            top: "50%",
            left: "-20px",
            transform: "translateY(-50%)",
        },
    });

    return (
        <>
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{
                    "&:hover": { backgroundColor: "172032" },
                    paddingY: "8px",
                    paddingX: "24px",
                }}
            >
                <ListItemIcon sx={{ color: "#949ca9" }}>{icon}</ListItemIcon>
                <ListItemText primary={name} sx={{ ml: "-10px" }} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List>
                    {subPaths.map(({ name, url }) => (
                        <NavLink to={url} style={{ textDecoration: "none" }} key={url} end>
                            <ListItemButton
                                className="linkBtn sub-link"
                                key={url}
                                sx={{
                                    "&:hover": { backgroundColor: "#172032" },
                                    paddingY: "8px",
                                    paddingLeft: "70px",
                                }}
                            >
                                <CustomListItemText
                                    primary={name}
                                    sx={{
                                        color: "#949ca9",
                                    }}
                                />
                            </ListItemButton>
                        </NavLink>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default CollapsedAdminSidebarItem;
