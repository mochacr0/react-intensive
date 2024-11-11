import HttpsIcon from "@mui/icons-material/Https";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/useAppSelector";
import { AuthTokenPair, VerifyRequest } from "../models/authModels";
import { useCurrentUserContext } from "../providers/CurrentUserProvider";
import { useVerifyMutation } from "../redux/features/authApiSlice";
import { setAuthTokenPair } from "../redux/features/tokenSlice";
import { useLazyGetUserInfoQuery } from "../redux/features/userApiSlice";

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
    const [getUserInfoTrigger, getUserInfoQueryResult] = useLazyGetUserInfoQuery();

    function isLoading() {
        return verifyMutationResult.isLoading || getUserInfoQueryResult.isLoading;
    }

    async function handleSubmit(formData: VerifyFormValues) {
        const verifyRequest: VerifyRequest = {
            userName: formData.username,
            code: formData.verifyCode,
        };

        try {
            const verifyResponse = await verify(verifyRequest).unwrap();

            if (verifyResponse.status !== 200) {
                toast.error(`Failed to verify: ${verifyResponse.message}`);
                return;
            }

            toast.success(verifyResponse.message);
            formik.resetForm();

            const authTokenPair: AuthTokenPair = {
                token: verifyResponse.data.token,
                refreshToken: verifyResponse.data.refreshToken,
            };

            dispatch(setAuthTokenPair(authTokenPair));
            await fetchAndSetCurrentUserInfo();
            navigate("/");
        } catch (error) {
            toast.error("Failed to verify");
            console.error("Failed to verify: ", error);
        }
    }

    async function fetchAndSetCurrentUserInfo() {
        try {
            const getUserInfoResponse = await getUserInfoTrigger().unwrap();
            if (getUserInfoResponse.status >= 400) {
                console.log(`Failed to get current user info: ${getUserInfoResponse.message}`);
                return;
            }
            const userInfo = getUserInfoResponse.data;
            const currentUser = {
                userId: userInfo.userId,
                username: userInfo.userName,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
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
