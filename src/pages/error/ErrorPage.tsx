import { Warning } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
    homeUrl: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ homeUrl }) => {
    document.title = "Shop | Error";

    const navigate = useNavigate();

    function onGoHome() {
        navigate(homeUrl);
    }

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 8,
                }}
            >
                <Paper elevation={3} className="w-full p-8 text-center">
                    <Warning className="mx-auto mb-6 aspect-square text-red-500" fontSize="large" />

                    <Typography variant="h6" className="mb-4 text-4xl font-bold text-gray-900">
                        Something went wrong.
                    </Typography>

                    <Typography variant="body1" className="mb-8 text-gray-600">
                        We're experiencing some technical difficulties. Please try again later.
                    </Typography>

                    <Box className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            className="px-6 py-2"
                            variant="outlined"
                            startIcon={<HomeIcon />}
                            onClick={onGoHome}
                            size="large"
                        >
                            Go Home
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ErrorPage;
