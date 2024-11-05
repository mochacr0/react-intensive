import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HttpsIcon from "@mui/icons-material/Https";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { VerifyDto } from "../models/verifyModel";
import { useVerifyMutation } from "../redux/features/apiSlice";
import { Link, useNavigate } from "react-router-dom";

type VerifyFormValues = {
    username: string;
    verifyCode: string;
};

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    verifyCode: Yup.string().required("Verify code is required"),
});

const initialValues: VerifyFormValues = {
    username: "",
    verifyCode: "",
};

const VerifyForm = () => {
    const [verify, verifyMutation] = useVerifyMutation();
    const formik = useFormik<VerifyFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const navigate = useNavigate();

    async function handleSubmit(formData: VerifyFormValues) {
        try {
            const verifyDto: VerifyDto = {
                userName: formData.username,
                code: formData.verifyCode,
            };
            const response = await verify(verifyDto).unwrap();
            if (response.status !== 200) {
                toast.error("Failed to verify: " + response.message);
            } else {
                toast.success(response.message);
                formik.resetForm();
                //TODO: Save current user to context before navigating

                navigate("/");
            }
        } catch (error) {
            toast.error("Failed to verify");
            console.log("Failed to verify: ", verifyMutation.error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="m-auto flex flex-col items-center">
                <Avatar>
                    <HttpsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verify
                </Typography>
                <form noValidate className="w-full" onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                size="small"
                                value={formik.values.username}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                onChange={formik.handleChange}
                                disabled={verifyMutation.isLoading}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                name="verifyCode"
                                label="Verify code"
                                type="text"
                                size="small"
                                value={formik.values.verifyCode}
                                error={formik.touched.verifyCode && Boolean(formik.errors.verifyCode)}
                                helperText={formik.touched.verifyCode && formik.errors.verifyCode}
                                onChange={formik.handleChange}
                                disabled={verifyMutation.isLoading}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-5"
                        loading={verifyMutation.isLoading}
                    >
                        Verify
                    </LoadingButton>
                    <Box className="mt-5 flex justify-center">
                        <Box>
                            <Link to="/register" className="no-underline">
                                <Typography variant="body2" color="primary">
                                    Didn't receive the code? Create a new account
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default VerifyForm;
