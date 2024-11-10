import { Warning } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";

type DeleteProductConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
};

const DeleteProductConfirmDialog: React.FC<DeleteProductConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isLoading,
}) => {
    return (
        <Dialog open={open} maxWidth="xs" onClose={onClose}>
            <DialogTitle className="flex items-center gap-2">
                <Warning className="text-red-500" />
                <Typography className="text-xl font-medium">Delete Product</Typography>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this product? This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions className="p-4">
                <LoadingButton onClick={onClose} variant="outlined" disabled={isLoading}>
                    Cancel
                </LoadingButton>
                <LoadingButton onClick={onConfirm} variant="outlined" color="error" loading={isLoading}>
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteProductConfirmDialog;
