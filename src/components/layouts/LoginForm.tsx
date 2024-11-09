import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HttpsIcon from "@mui/icons-material/Https";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { LoginDto } from "../../models/loginModels";
import { useLoginMutation } from "../../redux/features/apiSlice";

type LoginFormValues = {
    username: string;
    password: string;
};

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const initialValues: LoginFormValues = {
    username: "",
    password: "",
};

const LoginForm = () => {
    const [login, loginMutation] = useLoginMutation();
    const formik = useFormik<LoginFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const navigate = useNavigate();

    async function handleSubmit(formData: LoginFormValues) {
        try {
            const loginDto: LoginDto = {
                userName: formData.username,
                password: formData.password,
            };
            const response = await login(loginDto).unwrap();
            if (response.status !== 200) {
                toast.error("Failed to login: " + response.message);
                return;
            }
            toast.success(response.message);
            formik.resetForm();
            navigate("/verify");
        } catch (error) {
            toast.info("Failed to login");
            console.log("Failed to login: ", loginMutation.error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="m-auto flex flex-col items-center">
                <Avatar>
                    <HttpsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
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
                                disabled={loginMutation.isLoading}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                size="small"
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                onChange={formik.handleChange}
                                disabled={loginMutation.isLoading}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-5"
                        loading={loginMutation.isLoading}
                    >
                        Login
                    </LoadingButton>
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
