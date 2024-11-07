import { Outlet } from "react-router-dom";
import CustomToastContainer from "../CustomToastContainer";
import Header from "./Header";
import { Box, Container } from "@mui/material";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container className="mt-20 px-8" maxWidth="lg">
                <Outlet />
            </Container>
            <CustomToastContainer />
        </>
    );
};

export default DefaultLayout;
