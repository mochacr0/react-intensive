import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerifyForm from "../../components/VerifyForm";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";

const VerifyPage = () => {
    document.title = "Shop | Verify Email";

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
