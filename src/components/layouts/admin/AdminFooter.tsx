import { Paper, Typography } from "@mui/material";
import React from "react";
import "../index.css";

const AdminFooter: React.FC<VoidFunction> = () => {
    return (
        <Paper
            sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "rgba(129, 139, 156, 0.1)s",
                py: "10px",
                mb: "20px",
                textAlign: "center",
            }}
        >
            <Typography>
                &copy;
                {new Date().getFullYear()}
            </Typography>
        </Paper>
    );
};

export default AdminFooter;
