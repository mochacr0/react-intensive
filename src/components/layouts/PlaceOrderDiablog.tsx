import { memo, useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete } from "@mui/material";
import { ProductDto } from "../../models/productModels";
import { toast } from "react-toastify";

type ProductItemProps = {
    product: ProductDto;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const PlaceOrderDialog = ({ isOpen, onOpen, onClose, product }: ProductItemProps) => {
    const handlePlaceOrder = useCallback(() => {
        toast.info(`Created order for ${product.name}`);
    }, [product.name]);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handlePlaceOrder();
            onClose();
        },
        [handlePlaceOrder, onClose],
    );

    // Memoize the quantity options array
    const quantityOptions = useMemo(
        () => (product.in_stock ? Array.from({ length: product.in_stock }, (_, i) => i + 1) : []),
        [product.in_stock],
    );

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>{`Place an Order: ${product.name}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>How many items would you like to order?</DialogContentText>
                <Autocomplete
                    options={quantityOptions}
                    sx={{ marginTop: 3 }}
                    getOptionLabel={(option) => option.toString()}
                    renderInput={(params) => <TextField {...params} type="number" label="Quantity" />}
                />
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(PlaceOrderDialog);
