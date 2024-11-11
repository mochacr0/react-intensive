import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AdminThemeProvider from "./providers/AdminThemeProvider.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <StyledEngineProvider injectFirst>
                <AdminThemeProvider rootElement={rootElement}>
                    <CssBaseline />
                    <App />
                </AdminThemeProvider>
            </StyledEngineProvider>
        </StrictMode>,
    );
}
