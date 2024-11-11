import { createBrowserRouter } from "react-router-dom";
import LoggedUserRouter from "../components/LoggedUserRouter";
import MyAccountPage from "../pages/account/MyAccountPage";
import MyOrders from "../pages/account/MyOrders";
import MyProfile from "../pages/account/MyProfile";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import VerifyPage from "../pages/verify/VerifyPage";
import RequiresAuth from "./RequiresAuth";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import ManageProductsPage from "../pages/admin/productManagement/ManageProductsPage";
import AddProductPage from "../pages/admin/productManagement/AddProductPage";
import ManageOrdersPage from "../pages/admin/orderManagement/ManageOrdersPage";
import AdminDefaultLayout from "../components/layouts/admin/AdminDefaultLayout";
import DefaultLayout from "../components/layouts/user/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage homeUrl="/" />,
        children: [
            {
                path: "/",
                element: (
                    <RequiresAuth>
                        <HomePage />
                    </RequiresAuth>
                ),
                index: true,
            },
            {
                path: "register",
                element: (
                    <LoggedUserRouter>
                        <RegisterPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "verify",
                element: (
                    <LoggedUserRouter>
                        <VerifyPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "login",
                element: (
                    <LoggedUserRouter>
                        <LoginPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "account",
                element: <MyAccountPage />,
                children: [
                    { path: "", element: <MyProfile />, index: true },
                    { path: "profile", element: <MyProfile /> },
                    { path: "orders", element: <MyOrders /> },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <AdminDefaultLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: "products",
                element: <ManageProductsPage />,
            },
            {
                path: "products/add",
                element: <AddProductPage />,
            },
            {
                path: "orders",
                element: <ManageOrdersPage />,
            },
        ],
    },
]);

export default router;
