import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Card, Chip, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { DEFAULT_PAGINATION_MODEL } from "../common/constant";
import { capitalize, getOrderStatusColor } from "../common/mock/utils";
import { useGetOrdersQuery } from "../redux/features/orderApiSlice";

type OrderTableProps = {
    handleOpenConfirmDialog: (orderNumber: string) => void;
};

const OrderTable: React.FC<OrderTableProps> = ({ handleOpenConfirmDialog }) => {
    const { data, isLoading, isFetching } = useGetOrdersQuery();

    function isLoadingOrders() {
        return isLoading || isFetching;
    }

    const columns: GridColDef[] = [
        { field: "orderNumber", headerName: "Order Number", width: 150, align: "center", headerAlign: "center" },
        {
            field: "totalPayment",
            headerName: "Total Payment",
            width: 150,
            valueGetter: (_, row) => `${row.payment.amount}`,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "Received",
            headerName: "Received",
            width: 150,
            valueGetter: (_, row) => `${row.payment.received}`,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "created",
            headerName: "Ordered At",
            width: 250,
            type: "dateTime",
            valueGetter: (_, row) => new Date(row.created),
            align: "center",
            headerAlign: "center",
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any, string>) => {
                return <Chip label={capitalize(params.value)} color={getOrderStatusColor(params.value)} size="small" />;
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
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Box>
                        <IconButton
                            onClick={() => {
                                handleCompleteOrderButtonClicked(params.row.orderNumber);
                            }}
                            disabled={params.row?.status === "completed"}
                        >
                            <Tooltip title="Mark as Completed">
                                <CheckCircleIcon color={params.row?.status === "completed" ? "inherit" : "primary"} />
                            </Tooltip>
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    function handleCompleteOrderButtonClicked(orderNumber: string) {
        handleOpenConfirmDialog(orderNumber);
    }

    return (
        <Card>
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
        </Card>
    );
};

export default OrderTable;
