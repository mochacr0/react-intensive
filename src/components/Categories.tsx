import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import { useGetCategoriesQuery } from "../redux/features/apiSlice";
import CategoryItem from "./layouts/CategoryItem";
import Loading from "./layouts/Loading";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Categories = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    return (
        <Box className="my-10 w-full">
            <h2 className="mb-6 text-center text-2xl font-medium uppercase text-gray-800">Shop by category</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <Carousel responsive={responsive} itemClass="px-3" draggable={false} infinite={true} rewind={true}>
                    {(data?.data?.categories || []).map((category) => {
                        return <CategoryItem key={category.categoryId} category={category} />;
                    })}
                </Carousel>
            )}
        </Box>
    );
};

export default Categories;
