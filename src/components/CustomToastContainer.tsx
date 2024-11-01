import { ToastContainer } from "react-toastify";
import { TOAST_DURATION_IN_MILISECONDS } from "../common/constant";

function CustomToastContainer() {
  return (
    <ToastContainer
      autoClose={TOAST_DURATION_IN_MILISECONDS}
      pauseOnHover={false}
    />
  );
}

export default CustomToastContainer;
