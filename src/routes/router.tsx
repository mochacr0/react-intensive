import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
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
                path: "/register",
                element: (
                    <LoggedUserRouter>
                        <RegisterPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "/verify",
                element: (
                    <LoggedUserRouter>
                        <VerifyPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "/login",
                element: (
                    <LoggedUserRouter>
                        <LoginPage />
                    </LoggedUserRouter>
                ),
            },
            {
                path: "/account",
                element: <MyAccountPage />,
                children: [
                    { path: "", element: <MyProfile />, index: true },
                    { path: "profile", element: <MyProfile /> },
                    { path: "orders", element: <MyOrders /> },
                ],
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
