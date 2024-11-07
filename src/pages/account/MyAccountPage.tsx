import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import InfoIcon from "@mui/icons-material/Info";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { ReactNode } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";

type MyAccountPath = {
    name: string;
    path: string;
    icon: ReactNode;
    isDefault?: boolean;
};

const accountSections: MyAccountPath[] = [
    {
        name: "My Profile",
        path: "/account/profile",
        icon: <Inventory2Icon />,
        isDefault: true,
    },
    {
        name: "My Orders",
        path: "/account/orders",
        icon: <InfoIcon />,
    },
];

const MyAccountSideBar: React.FC<{ paths: MyAccountPath[] }> = ({ paths }) => {
    const { currentUser } = useCurrentUserContext();
    const location = useLocation();

    function isItemActive(path: MyAccountPath) {
        if (!path.isDefault) {
            return path.path === location.pathname;
        }
        return path.path.includes(location.pathname) || location.pathname === path.path;
    }

    return (
        <Card>
            <CardContent>
                <CardHeader
                    avatar={<Avatar />}
                    title={
                        <Typography className="text-xl">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
                    }
                />
                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                    {paths.map((path) => {
                        return (
                            <ListItemButton
                                key={path.path}
                                component={Link}
                                to={path.path}
                                selected={isItemActive(path)}
                                className={isItemActive(path) ? "bg-gray-300" : ""}
                            >
                                <ListItemIcon>{path.icon}</ListItemIcon>
                                <ListItemText primary={path.name} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

const MyAccountContent = () => {
    return (
        <Card>
            <CardContent>
                <Outlet />
            </CardContent>
        </Card>
    );
};

const MyAccountPage: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}>
                <MyAccountSideBar paths={accountSections} />
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
                <MyAccountContent />
            </Grid>
        </Grid>
    );
};

export default MyAccountPage;
