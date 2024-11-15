import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import RequiresAuth from "../../../routes/RequiresAuth";
import AdminSidebar from "./AdminSidebar";
import CustomToastContainer from "../../CustomToastContainer";

const sideBarWidth = 250;

function AdminDefaultLayout() {
    return (
        <RequiresAuth>
            <AdminHeader sideBarWidth={sideBarWidth} />
            <AdminSidebar sideBarWidth={sideBarWidth} />
            <Box
                component="main"
                sx={{
                    width: {
                        xs: "100%",
                        md: `calc(100% - ${sideBarWidth}px)`,
                    },
                    marginLeft: {
                        xs: 0,
                        md: `${sideBarWidth}px`,
                    },
                }}
                className="flex-grow px-1 md:px-2"
            >
                <Outlet />
            </Box>
            <CustomToastContainer />
        </RequiresAuth>
    );
}

export default AdminDefaultLayout;
