import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box className="flex h-full w-full justify-center">
            <CircularProgress />
        </Box>
    );
};

export default Loading;
