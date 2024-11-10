import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import ProductTable from "../../../components/ProductTable";
import { useDeleteProductByIdMutation } from "../../../redux/features/apiSlice";

const ManageProductsPage: React.FC = () => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const [deleteProductById, deleteProductByIdMutationResult] = useDeleteProductByIdMutation();

    function handleCloseConfirmDialog() {
        setIsConfirmDialogOpen(false);
    }

    function handleOpenConfirmDialog() {
        setIsConfirmDialogOpen(true);
    }

    async function handleConfirmDeleteProduct() {
        try {
            const deleteProductResponse = await deleteProductById("1").unwrap();
            if (deleteProductResponse.status !== 200) {
                toast.error(`Failed to delete product: ${deleteProductResponse.message}`);
                return;
            }
            toast.success("Product deleted successfully");
            handleCloseConfirmDialog();
            return;
        } catch (error) {
            toast.error("Failed to delete product");
            console.log("Failed to delete product", deleteProductByIdMutationResult.error);
        }
    }

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
                <ProductTable openConfirmDeleteDialog={handleOpenConfirmDialog} />
                <ConfirmDialog
                    title="Delete Product"
                    warning="Are you sure you want to delete this product? This action cannot be undone."
                    open={isConfirmDialogOpen}
                    onClose={handleCloseConfirmDialog}
                    onConfirm={handleConfirmDeleteProduct}
                    isLoading={deleteProductByIdMutationResult.isLoading}
                />
            </Box>
        </Box>
    );
};

export default ManageProductsPage;
