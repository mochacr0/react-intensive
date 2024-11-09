import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../providers/CurrentUserProvider";

const LoggedUserRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUserContext();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [navigate, currentUser]);

    return children;
};

export default LoggedUserRouter;
