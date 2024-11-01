import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import DefaultLayout from "../components/layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/", element: <HomePage />, index: true }],
    errorElement: <ErrorPage />,
  },
]);

export default router;
