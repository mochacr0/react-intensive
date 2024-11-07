import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import MyAccountPage from "../pages/account/MyAccountPage";
import RegisterPage from "../pages/register/RegisterPage";
import VerifyPage from "../pages/verify/VerifyPage";
import MyOrders from "../pages/account/MyOrders";
import MyProfile from "../pages/account/MyProfile";
import RequiresAuth from "./RequiresAuth";
import ProductCatalogPage from "../pages/productCatalog/ProductCatalogPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                index: true,
            },
            { path: "/register", element: <RegisterPage /> },
            { path: "/verify", element: <VerifyPage /> },
            { path: "/login", element: <LoginPage /> },
            {
                path: "/account",
                element: (
                    <RequiresAuth>
                        <MyAccountPage />
                    </RequiresAuth>
                ),
                children: [
                    { path: "", element: <MyProfile />, index: true },
                    { path: "profile", element: <MyProfile /> },
                    { path: "orders", element: <MyOrders /> },
                ],
            },
            { path: "/products", element: <ProductCatalogPage /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
