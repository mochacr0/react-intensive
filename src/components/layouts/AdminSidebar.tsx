import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CategoryIcon from "@mui/icons-material/Category";
import CollapsedAdminSidebarItem from "./CollapsedAdminSideBarItem";
import AdminSideBarItem from "./AdminSideBarItem";
import AdbIcon from "@mui/icons-material/Adb";
import { SideBarItem } from "../../models/sideBarModels";

const paths: SideBarItem[] = [
    {
        name: "Dashboard",
        icon: <HomeIcon />,
        url: "/admin",
    },
    {
        name: "Products",
        icon: <CategoryIcon />,
        subPaths: [
            {
                name: "Products",
                url: "/admin/products",
            },
            {
                name: "Add Product",
                url: "/admin/products/add",
            },
        ],
    },
    {
        name: "Orders",
        icon: <ShoppingBasketIcon />,
        url: "/admin/orders",
    },
];

type AdminSidebarProps = {
    sideBarWidth: number;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sideBarWidth }) => {
    const drawer = (
        <>
            <Toolbar>
                <AdbIcon />
                <Typography variant="h6" className="ml-2 font-bold">
                    Store
                </Typography>
            </Toolbar>
            <Divider />
            <List disablePadding>
                {paths?.map((path, index) =>
                    "subPaths" in path ? (
                        <CollapsedAdminSidebarItem
                            key={index}
                            name={path.name}
                            icon={path.icon}
                            subPaths={path.subPaths}
                        />
                    ) : (
                        <AdminSideBarItem key={index} name={path.name} icon={path.icon} url={path.url} />
                    ),
                )}
            </List>
        </>
    );

    return (
        <Box component="nav" sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
            <Drawer
                variant="permanent"
                className="hidden md:block"
                open
                sx={{
                    "& .MuiDrawer-paper": {
                        width: sideBarWidth,
                        boxSizing: "border-box",
                        borderRight: 0,
                        backgroundColor: "sidebar.background",
                        color: "sidebar.textColor",
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default AdminSidebar;
