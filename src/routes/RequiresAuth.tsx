import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../providers/CurrentUserProvider";
import { toast } from "react-toastify";

type RequiresAuthProps = {
    children: ReactNode;
    allowedRoles?: string[];
};

const RequiresAuth: React.FC<RequiresAuthProps> = ({ allowedRoles, children }) => {
    const { currentUser } = useCurrentUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }
        if (!allowedRoles || allowedRoles.length === 0) {
            return;
        }
        if (!allowedRoles.includes(currentUser.username)) {
            toast.error("You are not authorized to view this page");
            navigate(-1);
        }
    }, [currentUser, navigate, location]);

    return children;
};

export default RequiresAuth;
