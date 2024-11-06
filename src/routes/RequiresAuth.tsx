import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../providers/CurrentUserProvider";

const RequiresAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentUser } = useCurrentUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }
    }, [currentUser, navigate, location]);

    return children;
};

export default RequiresAuth;
