import { Outlet } from "react-router-dom";
import CustomToastContainer from "../CustomToastContainer";
import Header from "./Header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <CustomToastContainer />
        </>
    );
};

export default DefaultLayout;
