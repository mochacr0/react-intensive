import { memo, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete } from "@mui/material";
import { ProductDto } from "../../models/productModels";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePlaceOrderMutation } from "../../redux/features/apiSlice";
import { CreateOrderDto } from "../../models/orderModels";
import { LoadingButton } from "@mui/lab";

type ProductItemProps = {
    product: ProductDto;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

type PlaceOrderFormValues = {
    quantity: number;
};

const initialValues: PlaceOrderFormValues = {
    quantity: 1,
};

const validationSchema = Yup.object({
    quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be at least 1"),
});

const PlaceOrderDialog = ({ isOpen, onOpen, onClose, product }: ProductItemProps) => {
    const formik = useFormik<PlaceOrderFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const [placeOrder, placeOrderMutationResult] = usePlaceOrderMutation();

    async function handleSubmit(formData: PlaceOrderFormValues) {
        const createOrderDto: CreateOrderDto = {
            productId: product.id,
            quantity: formData.quantity,
        };
        try {
            const createOrderResponse = await placeOrder(createOrderDto).unwrap();
            if (createOrderResponse.status >= 400) {
                toast.error(`Failed to place order: ${createOrderResponse.message}`);
                return;
            }
            toast.success("Order placed successfully");
            formik.resetForm();
            onClose();
        } catch (error) {
            toast.error("Failed to place order");
            console.log(`Failed to place order: ${placeOrderMutationResult.error}`);
        }
    }

    function handleCancel() {
        formik.resetForm();
        onClose();
    }

    function handleCloseDialog() {
        handleCancel();
    }

    // Memoize the quantity options array
    const quantityOptions = useMemo(
        () => (product.in_stock ? Array.from({ length: product.in_stock }, (_, i) => i + 1) : []),
        [product.in_stock],
    );

    return (
        <Dialog
            open={isOpen}
            onClose={handleCloseDialog}
            PaperProps={{
                component: "form",
                onSubmit: formik.handleSubmit,
            }}
        >
            <DialogTitle>{`Place an Order: ${product.name}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>How many items would you like to order?</DialogContentText>
                <Autocomplete
                    options={quantityOptions}
                    sx={{ marginTop: 3 }}
                    getOptionLabel={(option) => option.toString()}
                    inputValue={formik?.values?.quantity?.toString() || ""}
                    renderInput={(params) => (
                        <TextField
                            name="quantity"
                            {...params}
                            type="number"
                            label="Quantity"
                            // value={formik.values.quantity}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            // onChange={formik.handleChange}
                        />
                    )}
                    onChange={(_, value) => {
                        formik.setFieldValue("quantity", value);
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}>
                <LoadingButton
                    onClick={handleCancel}
                    color="error"
                    variant="contained"
                    disabled={placeOrderMutationResult.isLoading}
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={placeOrderMutationResult.isLoading}
                >
                    Confirm
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(PlaceOrderDialog);
