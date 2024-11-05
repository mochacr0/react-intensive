import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HttpsIcon from "@mui/icons-material/Https";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RegisterDto } from "../models/registerModel";
import { useRegisterMutation } from "../redux/features/apiSlice";

type RegisterFormValues = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 10 characters")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character",
        ),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Confirm password is not matched"),
});

const initialValues: RegisterFormValues = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
};

const RegisterForm = () => {
    const [register, registerMutation] = useRegisterMutation();
    const formik = useFormik<RegisterFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const navigate = useNavigate();

    async function handleSubmit(formData: RegisterFormValues) {
        try {
            const registerDto: RegisterDto = {
                email: formData.email,
                userName: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
            };
            const response = await register(registerDto).unwrap();
            if (response.status !== 200) {
                toast.error("Failed to register: " + response.message);
            } else {
                toast.success(response.message);
                formik.resetForm();
                navigate("/verify");
            }
        } catch (error) {
            toast.error("Failed to register");
            console.log("Failed to register: ", registerMutation.error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="m-auto flex flex-col items-center">
                <Avatar>
                    <HttpsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form noValidate className="w-full" onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid size={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="firstName"
                                label="First name"
                                type="text"
                                size="small"
                                value={formik.values.firstName}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                onChange={formik.handleChange}
                                disabled={registerMutation.isLoading}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="lastName"
                                label="Last name"
                                type="text"
                                size="small"
                                value={formik.values.lastName}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                onChange={formik.handleChange}
                                disabled={registerMutation.isLoading}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                size="small"
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                onChange={formik.handleChange}
                                disabled={registerMutation.isLoading}
                            />
                        </Grid>
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
                                disabled={registerMutation.isLoading}
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
                                disabled={registerMutation.isLoading}
                            />
                        </Grid>
                        <Grid size={12}>
                            {" "}
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                size="small"
                                value={formik.values.confirmPassword}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                onChange={formik.handleChange}
                                disabled={registerMutation.isLoading}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-5"
                        loading={registerMutation.isLoading}
                    >
                        Sign Up
                    </LoadingButton>
                    <Box className="mt-5 flex justify-center">
                        <Box>
                            <Link to="/login" className="no-underline">
                                <Typography variant="body2" color="primary">
                                    Already had an account? Sign In
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterForm;
