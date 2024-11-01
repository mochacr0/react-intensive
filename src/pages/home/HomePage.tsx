import { toast } from "react-toastify";

function HomePage() {
    return (
        <>
            <div className="text-3xl font-bold underline">Hello World</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
                onClick={() => {
                    toast.info("Hello World!");
                }}
            >
                Click me!
            </button>
        </>
    );
}

export default HomePage;
