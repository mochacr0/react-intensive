import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="mx-auto max-w-4xl px-4">
                {/* Main content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Company Info */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-800">Store</h3>
                        <p className="text-gray-600">Your trusted destination for quality products</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <HeadphonesOutlinedIcon className="h-4 w-4" />
                            <span>(555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <MailIcon className="h-4 w-4" />
                            <span>contact@store.com</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <MapOutlinedIcon className="h-4 w-4" />
                            <span>123 Store Street, City</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Store
                </div>
            </div>
        </footer>
    );
};

export default Footer;
