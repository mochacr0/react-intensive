import { Outlet } from "react-router-dom";
import CustomToastContainer from "../CustomToastContainer";

const DefaultLayout = () => {
    return (
        <>
            <Outlet />
            <CustomToastContainer />
        </>
    );
};

export default DefaultLayout;
