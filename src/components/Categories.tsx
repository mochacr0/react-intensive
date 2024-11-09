import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "./layouts/CategoryItem";
import { useGetCategoriesQuery } from "../redux/features/apiSlice";
import { CategoryDto } from "../models/categoryModels";
import Loading from "./layouts/Loading";

type Category = {
    id: string;
    name: string;
    imageUrl: string;
};

const categories: CategoryDto[] = [
    {
        code: "clothing",
        categoryId: "1",
        name: "Clothing",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
    {
        code: "shoes",
        categoryId: "2",
        name: "Shoes",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
    {
        code: "accessories",
        categoryId: "3",
        name: "Accessories",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
    {
        code: "electronics",
        categoryId: "4",
        name: "Electronics",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
    {
        code: "furniture",
        categoryId: "5",
        name: "Furniture",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
    {
        code: "books",
        categoryId: "6",
        name: "Books",
        img: "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg",
    },
];

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
