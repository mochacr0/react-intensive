import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import DefaultLayout from "../components/layouts/DefaultLayout";
import RegisterPage from "../pages/register/RegisterPage";
import VerifyPage from "../pages/verify/VerifyPage";
import LoginPage from "../pages/login/LoginPage";
import OrderPage from "../pages/order/OrderPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <HomePage />, index: true },
            { path: "/register", element: <RegisterPage /> },
            { path: "/verify", element: <VerifyPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/orders", element: <OrderPage /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
