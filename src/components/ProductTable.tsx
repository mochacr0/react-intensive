import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, Card, IconButton, Rating, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import { PRODUCT_SAMPLE_URL } from "../common/mock/productSamples";
import { useDeleteProductByIdMutation, useGetProductsQuery } from "../redux/features/apiSlice";
import DeleteProductConfirmDialog from "./DeleteProductConfirmDialog";

const paginationModel = { page: 0, pageSize: 5 };

const ProductTable: React.FC = () => {
    const { data, isLoading } = useGetProductsQuery();
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const [deleteProductById, deleteProductByIdMutationResult] = useDeleteProductByIdMutation();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center" },
        {
            field: "img",
            headerName: "Image",
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Box className="flex h-full w-full items-center justify-center">
                        <Avatar className="h-8 w-8" src={PRODUCT_SAMPLE_URL} alt={params.row.name} />
                    </Box>
                );
            },
        },
        { field: "name", headerName: "Name", align: "center", headerAlign: "center", width: 130 },
        {
            field: "category",
            headerName: "Category",
            align: "center",
            headerAlign: "center",
            valueGetter: (_, row) => `${row.category.name}`,
        },
        {
            field: "price",
            headerName: "Price",
            sortable: false,
            align: "center",
            headerAlign: "center",
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const { regular_price, sale_price } = params.row;
                return (
                    <Box>
                        {sale_price ? (
                            <>
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{ textDecoration: "line-through", marginRight: 1 }}
                                >
                                    ${regular_price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" component="span" color="error">
                                    ${sale_price.toFixed(2)}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body2" component="span">
                                ${regular_price.toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                );
            },
        },
        { field: "in_stock", headerName: "In Stock", align: "center", headerAlign: "center" },
        {
            field: "rating",
            headerName: "Rating",
            align: "center",
            headerAlign: "center",
            width: 130,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Box display="flex" alignItems="center" height="96%">
                        <Typography variant="body2" component="span" sx={{ marginRight: 1 }}>
                            {params.row.rating}
                        </Typography>
                        <Rating name="read-only" value={params.row.rating} readOnly size="small" />
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            width: 120,
            renderCell: () => {
                return (
                    <Box>
                        <IconButton onClick={handleDeleteButtonClicked}>
                            <DeleteIcon color="inherit" />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    function handleDeleteButtonClicked(): void {
        setIsConfirmDialogOpen(true);
    }

    function handleCloseConfirmDialog() {
        setIsConfirmDialogOpen(false);
    }

    async function handleConfirmDeleteProduct() {
        try {
            const deleteProductResponse = await deleteProductById("1").unwrap();
            if (deleteProductResponse.status === 200) {
                toast.success("Product deleted successfully");
                handleCloseConfirmDialog();
            } else {
                toast.error(`Failed to delete product: ${deleteProductResponse.message}`);
            }
        } catch (error) {
            toast.error("Failed to delete product");
            console.log("Failed to delete product", deleteProductByIdMutationResult.error);
        }
    }

    return (
        <Card className="mx-4">
            <DataGrid
                rows={data?.data?.products || []}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                loading={isLoading}
                slotProps={{
                    loadingOverlay: {
                        variant: "skeleton",
                        noRowsVariant: "skeleton",
                    },
                }}
            />
            <DeleteProductConfirmDialog
                open={isConfirmDialogOpen}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDeleteProduct}
                isLoading={deleteProductByIdMutationResult.isLoading}
            />
        </Card>
    );
};

export default ProductTable;
