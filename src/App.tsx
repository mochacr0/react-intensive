import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import router from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
