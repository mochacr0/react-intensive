import { Box, Typography } from "@mui/material";

const AdminDashboard: React.FC = () => {
    document.title = "Shop | Admin Dashboard";

    return (
        <Box className="h-screen pb-5 pt-20">
            <Box className="flex h-full items-center justify-center">
                {" "}
                <Box>
                    <img className="max-w-lg" src="/images/homepage-bg.png" alt="" />
                    <Typography className="text-center font-poppins font-bold" variant="h3">
                        Welcome Back
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
