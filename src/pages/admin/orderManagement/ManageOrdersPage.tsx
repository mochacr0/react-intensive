import { Box, Divider, Typography } from "@mui/material";
import OrderTable from "../../../components/OrderTable";

const ManageOrdersPage: React.FC = () => {
    return (
        <Box className="mx-5 my-20">
            <Box>
                <Box className="mb-5 flex items-center justify-between">
                    <Typography variant="h5" className="font-semibold">
                        Orders
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Divider />
                <OrderTable />
            </Box>
        </Box>
    );
};

export default ManageOrdersPage;
