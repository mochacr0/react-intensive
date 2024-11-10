import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProductTable from "../../../components/ProductTable";
import DeleteProductConfirmDialog from "../../../components/DeleteProductConfirmDialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteProductByIdMutation } from "../../../redux/features/apiSlice";

const ManageProductsPage: React.FC = () => {
    const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState<boolean>(false);
    const [deleteProductById, deleteProductByIdMutationResult] = useDeleteProductByIdMutation();

    function closeConfirmDialog() {
        setIsConfirmDeleteDialogOpen(false);
    }

    function openConfirmDialog() {
        setIsConfirmDeleteDialogOpen(true);
    }

    async function handleConfirmDeleteProduct() {
        try {
            const deleteProductResponse = await deleteProductById("1").unwrap();
            if (deleteProductResponse.status === 200) {
                toast.success("Product deleted successfully");
                closeConfirmDialog();
            } else {
                toast.error(`Failed to delete product: ${deleteProductResponse.message}`);
            }
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
                <ProductTable openConfirmDeleteDialog={openConfirmDialog} />
                <DeleteProductConfirmDialog
                    open={isConfirmDeleteDialogOpen}
                    onClose={closeConfirmDialog}
                    onConfirm={handleConfirmDeleteProduct}
                    isLoading={deleteProductByIdMutationResult.isLoading}
                />
            </Box>
        </Box>
    );
};

export default ManageProductsPage;
