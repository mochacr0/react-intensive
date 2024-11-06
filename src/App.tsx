import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import router from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { UserProvider } from "./providers/UserProvider";

const App = () => {
    return (
        <Provider store={store}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </Provider>
    );
};

export default App;
