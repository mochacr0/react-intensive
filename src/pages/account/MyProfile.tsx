import { Box, CardHeader, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";

const MyProfile: React.FC = () => {
    const { currentUser } = useCurrentUserContext();
    return (
        <>
            <CardHeader title="Profile" />
            <Box className="mx-4">
                <form noValidate className="w-full">
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="firstName"
                                label="First name"
                                type="text"
                                size="small"
                                value={currentUser?.firstName}
                                aria-readonly
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="lastName"
                                label="Last name"
                                type="text"
                                size="small"
                                value={currentUser?.lastName}
                                aria-readonly
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                label="Email Address"
                                name="text"
                                size="small"
                                value={currentUser?.email}
                                aria-readonly
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                label="Username"
                                name="username"
                                size="small"
                                value={currentUser?.username}
                                aria-readonly
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
};

export default MyProfile;
