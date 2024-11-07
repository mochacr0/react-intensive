import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import HttpsIcon from "@mui/icons-material/Https";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/useAppSelector";
import { AuthTokenPair } from "../models/tokenPairModels";
import { VerifyDto } from "../models/verifyModel";
import { useCurrentUserContext } from "../providers/CurrentUserProvider";
import { useLazyGetCurrentUserQuery, useVerifyMutation } from "../redux/features/apiSlice";
import { setAuthTokenPair } from "../redux/features/tokenSlice";

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
    const formik = useFormik<VerifyFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setCurrentUser } = useCurrentUserContext();
    const [verify, verifyMutationResult] = useVerifyMutation();
    const [getCurrentUserTrigger, getCurentUserQueryResult] = useLazyGetCurrentUserQuery();

    function isLoading() {
        return verifyMutationResult.isLoading || getCurentUserQueryResult.isLoading;
    }

    async function handleSubmit(formData: VerifyFormValues) {
        const verifyDto: VerifyDto = {
            userName: formData.username,
            code: formData.verifyCode,
        };

        try {
            const response = await verify(verifyDto).unwrap();

            if (response.status !== 200) {
                toast.error(`Failed to verify: ${response.message}`);
                return;
            }

            toast.success(response.message);
            formik.resetForm();

            const authTokenPair: AuthTokenPair = {
                accessToken: response.data.token,
                refreshToken: response.data.refreshToken,
            };

            dispatch(setAuthTokenPair(authTokenPair));
            await fetchAndSetCurrentUserInfo();
            navigate("/products");
        } catch (error) {
            toast.error("Failed to verify");
            console.error("Failed to verify: ", error);
        }
    }

    async function fetchAndSetCurrentUserInfo() {
        try {
            const currentUserInfoDto = await getCurrentUserTrigger().unwrap();
            if (currentUserInfoDto.status !== 200) {
                console.log(`Failed to get current user info: ${currentUserInfoDto.message}`);
                return;
            }
            const currrentUserDto = currentUserInfoDto.data;
            const currentUser = {
                userId: currrentUserDto.userId,
                username: currrentUserDto.userName,
                email: currrentUserDto.email,
                firstName: currrentUserDto.firstName,
                lastName: currrentUserDto.lastName,
            };
            setCurrentUser(currentUser);
        } catch (error) {
            console.error("Failed to fetch user info: ", error);
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
                                disabled={isLoading()}
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
                                disabled={isLoading()}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-5"
                        loading={verifyMutationResult.isLoading}
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
