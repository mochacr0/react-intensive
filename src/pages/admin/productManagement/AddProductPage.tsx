import { Box, Typography } from "@mui/material";
import AddProductForm from "../../../components/AddProductForm";
function AddProductPage() {
    return (
        <Box className="mx-5 my-20">
            <Box className="mb-5 flex items-center justify-between">
                {" "}
                <Typography variant="h5" className="font-semibold">
                    Add Product
                </Typography>
            </Box>
            <AddProductForm />
        </Box>
    );
}

export default AddProductPage;
