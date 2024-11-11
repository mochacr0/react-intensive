import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CustomToastContainer from "../../CustomToastContainer";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container className="mt-20 px-24" maxWidth="xl">
                <Outlet />
            </Container>
            <Footer />
            <CustomToastContainer />
        </>
    );
};

export default DefaultLayout;
