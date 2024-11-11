import { Warning } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";

type CompleteOrderConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
};

const CompleteOrderConfirmDialog: React.FC<CompleteOrderConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isLoading,
}) => {
    return (
        <Dialog open={open} maxWidth="xs" onClose={onClose}>
            <DialogTitle className="flex items-center gap-2">
                <Warning className="text-red-500" />
                <Typography className="text-xl font-medium">Mark as Completed</Typography>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to mark this order as copmleted? This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions className="p-4">
                <LoadingButton onClick={onClose} variant="outlined" disabled={isLoading}>
                    Cancel
                </LoadingButton>
                <LoadingButton onClick={onConfirm} variant="outlined" color="error" loading={isLoading}>
                    Confirm
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default CompleteOrderConfirmDialog;
