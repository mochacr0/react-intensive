import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { decrement, increment } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const HomePage = () => {
    const counterValue = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className="text-3xl font-bold underline">Hello World</div>
            <Button
                variant="contained"
                onClick={() => {
                    toast.info("Hello World!");
                }}
            >
                Toast!
            </Button>
            <div className="text-3xl font-bold">{counterValue}</div>
            <Button
                variant="contained"
                onClick={() => {
                    dispatch(increment());
                }}
            >
                Increment
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                Decrement
            </Button>
        </>
    );
};

export default HomePage;
