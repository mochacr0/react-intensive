import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { decrement, increment } from "../../redux/features/counterSlice";

const HomePage = () => {
    const counterValue = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="text-3xl font-bold underline">Hello World</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
                onClick={() => {
                    toast.info("Hello World!");
                }}
            >
                Toast!
            </button>
            <div className="text-3xl font-bold">{counterValue}</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
                onClick={() => {
                    dispatch(increment());
                }}
            >
                Increment
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                Decrement
            </button>
        </>
    );
};

export default HomePage;
