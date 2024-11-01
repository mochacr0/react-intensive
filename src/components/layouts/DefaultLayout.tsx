import { Outlet } from "react-router-dom";
import CustomToastContainer from "../CustomToastContainer";

function DefaultLayout() {
    return (
        <>
            <Outlet />
            <CustomToastContainer />
        </>
    );
}

export default DefaultLayout;
