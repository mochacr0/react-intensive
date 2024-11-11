import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, CardHeader, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { capitalize, getOrderStatusColor } from "../../common/mock/utils";
import { useGetOrdersQuery } from "../../redux/features/orderApiSlice";
import { DEFAULT_PAGINATION_MODEL } from "../../common/constant";

const columns: GridColDef[] = [
    { field: "orderNumber", headerName: "Order Number", width: 180, align: "center", headerAlign: "center" },
    {
        field: "totalPayment",
        headerName: "Total Payment",
        width: 170,
        valueGetter: (_, row) => `${row.payment.amount}`,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "created",
        headerName: "Ordered At",
        width: 200,
        type: "dateTime",
        valueGetter: (_, row) => new Date(row.created),
        align: "center",
        headerAlign: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 180,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<any, string>) => {
            return <Chip label={capitalize(params.value)} color={getOrderStatusColor(params.value)} size="small" />;
        },
    },
];

const MyOrders: React.FC = () => {
    document.title = "Shop | My Orders";

    const { data, isLoading, isFetching, refetch } = useGetOrdersQuery();

    function isLoadingOrders() {
        return isLoading || isFetching;
    }

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
                        disabled={isLoadingOrders()}
                    >
                        Reload
                    </Button>
                }
            />

            <Box className="mx-4 flex flex-col">
                <DataGrid
                    rows={data?.data?.orders || []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: DEFAULT_PAGINATION_MODEL } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                    getRowId={(row) => row.orderNumber}
                    loading={isLoadingOrders()}
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                />
            </Box>
        </>
    );
};

export default MyOrders;
