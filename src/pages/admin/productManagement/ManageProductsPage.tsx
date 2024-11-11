import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import ProductTable from "../../../components/ProductTable";
import { useDeleteProductByIdMutation, useLazyGetProductsQuery } from "../../../redux/features/apiSlice";

const ManageProductsPage: React.FC = () => {
    document.title = "Shop | Manage Products";

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const [deleteProductById, deleteProductByIdMutationResult] = useDeleteProductByIdMutation();
    const [getProductsQueryTrigger, getProductsQueryResult] = useLazyGetProductsQuery();

    function handleCloseConfirmDialog() {
        setIsConfirmDialogOpen(false);
    }

    function handleOpenConfirmDialog() {
        setIsConfirmDialogOpen(true);
    }

    function handleReload() {
        getProductsQueryTrigger();
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
                    <Typography variant="h5" className="font-semibold">
                        Products
                    </Typography>
                    <Box className="flex gap-3 self-end">
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            endIcon={<RestartAltIcon />}
                            onClick={handleReload}
                            loading={getProductsQueryResult.isLoading || getProductsQueryResult.isFetching}
                        >
                            Reload
                        </LoadingButton>
                        <NavLink to="/admin/products/add" className="no-underline">
                            <Button endIcon={<AddIcon fontSize="small" />} variant="contained" color="primary">
                                <Typography component={"div"} variant="button">
                                    Add Product
                                </Typography>
                            </Button>
                        </NavLink>
                    </Box>
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
