import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, CardHeader } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOrdersQuery } from "../../redux/features/apiSlice";
import Loading from "../../components/layouts/Loading";

const columns: GridColDef[] = [
    { field: "orderNumber", headerName: "Order Number", width: 200 },
    {
        field: "totalPayment",
        headerName: "Total Payment",
        width: 200,
        valueGetter: (value, row) => `${row.payment.amount}`,
    },
    { field: "status", headerName: "Status", width: 200 },
    {
        field: "rated",
        headerName: "Rated",
        width: 180,
        valueGetter: (value, row) => `${row.status === "completed" ? row.rating : ""}`,
    },
];

const paginationModel = { page: 0, pageSize: 5 };

const MyOrders: React.FC = () => {
    const { data, isLoading, refetch } = useGetOrdersQuery();

    function handleReload() {
        refetch();
    }

    return (
        <>
            <CardHeader
                title="Orders"
                action={
                    <Button
                        className="self-end"
                        variant="outlined"
                        endIcon={<RestartAltIcon />}
                        onClick={handleReload}
                        disabled={isLoading}
                    >
                        Reload
                    </Button>
                }
            />
            {isLoading ? (
                <Loading />
            ) : (
                <Box className="mx-4 flex flex-col">
                    <DataGrid
                        rows={data || []}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                        getRowId={(row) => row.orderNumber}
                        loading={isLoading}
                        slotProps={{
                            loadingOverlay: {
                                variant: "skeleton",
                                noRowsVariant: "skeleton",
                            },
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default MyOrders;
