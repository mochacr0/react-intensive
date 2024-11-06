import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import router from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CurrentUserProvider } from "./providers/CurrentUserProvider";

const App = () => {
    return (
        <Provider store={store}>
            <CurrentUserProvider>
                <RouterProvider router={router} />
            </CurrentUserProvider>
        </Provider>
    );
};

export default App;
