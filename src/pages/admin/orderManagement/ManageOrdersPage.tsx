import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import OrderTable from "../../../components/OrderTable";
import { useCompleteOrderMutation, useLazyGetOrdersQuery } from "../../../redux/features/apiSlice";

const ManageOrdersPage: React.FC = () => {
    document.title = "Shop | Manage Orders";

    const [selectedOrderNumber, setSelectedOrderNumber] = useState<string | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const [completeOrder, completeOrderMutationResult] = useCompleteOrderMutation();
    const [getOrdersQueryTrigger, getOrderQueryResult] = useLazyGetOrdersQuery();

    function handleCloseConfirmDialog() {
        setIsConfirmDialogOpen(false);
    }

    function handleOpenConfirmDialog(orderNumber: string) {
        setSelectedOrderNumber(orderNumber);
        setIsConfirmDialogOpen(true);
    }

    function handleReload() {
        getOrdersQueryTrigger();
    }

    async function handleConfirmCompleteOrder() {
        if (!selectedOrderNumber) {
            toast.error("No order selected");
            return;
        }
        console.log("Completing order: ", selectedOrderNumber);
        try {
            const completeOrderResponse = await completeOrder({
                orderNumber: selectedOrderNumber,
            }).unwrap();
            if (completeOrderResponse.status !== 200) {
                toast.error(`Failed to complete order: ${completeOrderResponse.message}`);
                return;
            }
            toast.success("Order completed successfully");
            handleCloseConfirmDialog();
            return;
        } catch (error) {
            toast.error("Failed to complete order");
            console.log("Failed to complete order", completeOrderMutationResult.error);
        }
    }

    return (
        <Box className="mx-5 my-20">
            <Box>
                <Box className="mb-5 flex items-center justify-between">
                    <Typography variant="h5" className="font-semibold">
                        Orders
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className="self-end"
                        endIcon={<RestartAltIcon />}
                        onClick={handleReload}
                        disabled={getOrderQueryResult.isLoading || getOrderQueryResult.isFetching}
                    >
                        Reload
                    </Button>
                </Box>
            </Box>
            <Box>
                <Divider />
                <OrderTable handleOpenConfirmDialog={handleOpenConfirmDialog} />
                <ConfirmDialog
                    title="Mark as Completed"
                    warning="Are you sure you want to mark this order as completed? This action cannot be undone."
                    open={isConfirmDialogOpen}
                    onClose={handleCloseConfirmDialog}
                    onConfirm={handleConfirmCompleteOrder}
                    isLoading={completeOrderMutationResult.isLoading}
                />
            </Box>
        </Box>
    );
};

export default ManageOrdersPage;
