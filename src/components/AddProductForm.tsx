import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, CircularProgress, InputAdornment, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AddProductRequest } from "../models/productModels";
import { useAddProductMutation, useGetCategoriesQuery } from "../redux/features/apiSlice";

type AddProductFormValues = {
    productId: string;
    productName: string;
    categoryCode: string;
    categoryName: string;
    rating: number;
    imageUrl: string;
    inStock: number;
    sold: number;
    price: number;
    salePrice: number;
};

const validationSchema = Yup.object({
    productId: Yup.string().required("Product ID is required"),
    productName: Yup.string().required("Product Name is required"),
    categoryName: Yup.string().required("Category is required"),
    rating: Yup.number().required("Rating is required").min(0.1, "Rating must be at least 0.1"),
    imageUrl: Yup.string().required("Image URL is required"),
    inStock: Yup.number().required("In Stock is required"),
    sold: Yup.number().required("Sold is required"),
    price: Yup.number().required("Price is required").min(0, "Price must be at least 0"),
    salePrice: Yup.number().required("Sale Price is required").min(0, "Sale Price must be at least 0"),
});

const initialValues: AddProductFormValues = {
    productId: "",
    productName: "",
    categoryCode: "",
    categoryName: "",
    rating: 0.1,
    imageUrl: "",
    inStock: 0,
    sold: 0,
    price: 0,
    salePrice: 0,
};

function AddProductForm() {
    const formik = useFormik<AddProductFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleAddProduct,
        enableReinitialize: true,
    });
    const { data: getCategoriesResponse, isLoading: isFetchingCategories } = useGetCategoriesQuery();
    const [addProduct, addProductMutationResult] = useAddProductMutation();
    const navigate = useNavigate();

    async function handleAddProduct(formData: AddProductFormValues) {
        const addProductRequest: AddProductRequest = {
            id: formData.productId,
            name: formData.productName,
            img: formData.imageUrl,
            category: formData.categoryCode,
            in_stock: formData.inStock,
            sold: formData.sold,
            regular_price: formData.price,
            sale_price: formData.salePrice,
            rating: formData.rating,
        };
        try {
            const addProductResponse = await addProduct(addProductRequest).unwrap();
            if (addProductResponse.status === 200 || addProductResponse.status === 201) {
                toast.success("Product added successfully");
                formik.resetForm();
                navigate("/admin/products");
            }
        } catch (error) {
            toast.error("Failed to add product");
            console.log(`Failed to add product: ${addProductMutationResult.error}`);
        }
    }

    function handleCancel() {
        navigate("/admin/products");
    }

    return (
        <Paper className="mx-auto my-2 max-w-2xl overflow-hidden rounded-lg border border-gray-300 px-8 py-4 shadow-none">
            <form noValidate className="w-full" onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={2}>
                    <Grid size={5}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="productId"
                            label="Product ID"
                            type="text"
                            size="small"
                            value={formik.values.productId}
                            error={formik.touched.productId && Boolean(formik.errors.productId)}
                            helperText={formik.touched.productId && formik.errors.productId}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={7}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="productName"
                            label="Product Name"
                            type="text"
                            size="small"
                            value={formik.values.productName}
                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                            helperText={formik.touched.productName && formik.errors.productName}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={8}>
                        <Autocomplete
                            options={getCategoriesResponse?.data?.categories || []}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.code === value.code}
                            inputValue={formik?.values?.categoryName?.toString() || ""}
                            disabled={addProductMutationResult.isLoading}
                            renderInput={(params) => (
                                <TextField
                                    name="categoryName"
                                    {...params}
                                    type="text"
                                    label="Category"
                                    size="small"
                                    margin="normal"
                                    error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {isFetchingCategories ? (
                                                        <CircularProgress color="inherit" size={20} />
                                                    ) : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        },
                                    }}
                                />
                            )}
                            onChange={(_, value) => {
                                formik.setFieldValue("categoryName", value?.name);
                                formik.setFieldValue("categoryCode", value?.code);
                            }}
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Rating"
                            name="rating"
                            size="small"
                            type="number"
                            slotProps={{
                                input: {
                                    inputProps: { min: 0, max: 5, step: "0.1" },
                                },
                            }}
                            value={formik.values.rating}
                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                            helperText={formik.touched.rating && formik.errors.rating}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="imageUrl"
                            label="Image URL"
                            size="small"
                            value={formik.values.imageUrl}
                            error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                            helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="inStock"
                            label="In Stock"
                            type="number"
                            size="small"
                            value={formik.values.inStock}
                            error={formik.touched.inStock && Boolean(formik.errors.inStock)}
                            helperText={formik.touched.inStock && formik.errors.inStock}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="sold"
                            label="Sold"
                            type="number"
                            size="small"
                            value={formik.values.sold}
                            error={formik.touched.sold && Boolean(formik.errors.sold)}
                            helperText={formik.touched.sold && formik.errors.sold}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            size="small"
                            label="Regular Price"
                            name="price"
                            type="number"
                            variant="outlined"
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0, step: "0.01" },
                                },
                            }}
                            value={formik.values.price}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            size="small"
                            label="Sale Price"
                            name="salePrice"
                            type="number"
                            variant="outlined"
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0, step: "0.01" },
                                },
                            }}
                            value={formik.values.salePrice}
                            error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
                            helperText={formik.touched.salePrice && formik.errors.salePrice}
                            onChange={formik.handleChange}
                            disabled={addProductMutationResult.isLoading}
                        />
                    </Grid>
                </Grid>
                <Box className="mt-5 flex items-center justify-end gap-3">
                    <LoadingButton
                        variant="outlined"
                        color="error"
                        size="medium"
                        startIcon={<ClearIcon />}
                        onClick={handleCancel}
                        className="w-36"
                        disabled={addProductMutationResult.isLoading}
                    >
                        Cancel
                    </LoadingButton>
                    <LoadingButton
                        variant="outlined"
                        color="primary"
                        type="submit"
                        size="medium"
                        startIcon={<AddIcon />}
                        className="w-36"
                        loading={addProductMutationResult.isLoading}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </form>
        </Paper>
    );
}

export default AddProductForm;
