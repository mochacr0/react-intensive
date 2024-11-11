import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import MailIcon from "@mui/icons-material/Mail";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <footer className="mb-4 mt-5 pt-16">
            <Box className="mx-auto max-w-4xl px-4">
                {/* Main content */}
                <Box className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Company Info */}
                    <Box className="space-y-2 text-right">
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Store
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            Your trusted destination for quality products
                        </Typography>
                    </Box>

                    {/* Contact Info */}
                    <Box className="space-y-3">
                        <Box className="flex items-center space-x-2 text-gray-600">
                            <HeadphonesOutlinedIcon className="h-4 w-4" />
                            <Typography variant="body2">(555) 123-4567</Typography>
                        </Box>
                        <Box className="flex items-center space-x-2 text-gray-600">
                            <MailIcon className="h-4 w-4" />
                            <Typography variant="body2">contact@store.com</Typography>
                        </Box>
                        <Box className="flex items-center space-x-2 text-gray-600">
                            <MapOutlinedIcon className="h-4 w-4" />
                            <Typography variant="body2">123 Store Street, City</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Copyright */}
                <Box className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Store
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
