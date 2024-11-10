import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProductTable from "../../../components/ProductTable";

const ProductManagementPage: React.FC = () => {
    return (
        <Box className="mx-5 my-20">
            <Box>
                <Box className="mb-5 flex items-center justify-between">
                    {" "}
                    <Typography variant="h5" className="font-semibold">
                        Products
                    </Typography>
                    <NavLink to="/admin/products/add" className="no-underline">
                        <Button variant="contained" color="primary" className="flex items-center justify-between">
                            <AddIcon fontSize="small" />
                            <Typography component={"div"} variant="button" className="ml-2">
                                Add Product
                            </Typography>
                        </Button>
                    </NavLink>
                </Box>
            </Box>
            <Box>
                <Divider />
                <ProductTable />
            </Box>
        </Box>
    );
};

export default ProductManagementPage;
