import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import React from "react";
import AdminProfileMenu from "./AdminProfileMenu";

interface NavbarProps {
    sideBarWidth: number;
}

const AdminHeader: React.FC<NavbarProps> = ({ sideBarWidth }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: {
                    xs: "100%",
                    md: `calc(100% - ${sideBarWidth}px)`,
                },
                ml: {
                    xs: 0,
                    md: `${sideBarWidth}px`,
                },
            }}
            className={`border-b bg-white text-black shadow-none md:ml-[${sideBarWidth}px]`}
        >
            <Toolbar>
                <Box className="flex w-full items-center justify-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AdminProfileMenu />
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
