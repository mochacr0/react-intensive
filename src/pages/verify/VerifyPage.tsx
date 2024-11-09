import { useNavigate } from "react-router-dom";
import VerifyForm from "../../components/VerifyForm";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { useEffect } from "react";

const VerifyPage = () => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUserContext();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [navigate, currentUser]);

    return <VerifyForm />;
};

export default VerifyPage;
