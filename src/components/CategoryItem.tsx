import { Box, Card } from "@mui/material";
import React from "react";
import { Category } from "../models/categoryModels";
import { SAMPLE_IMAGE_URL } from "../common/constant";

const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
    return (
        <Card className="w-30 group relative aspect-square overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            {/* Image */}
            <img src={SAMPLE_IMAGE_URL} alt={category.name} className="h-full w-full object-cover" />

            {/* Overlay - Only visible on hover */}
            <Box className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content container */}
            <Box className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {/* Category name */}
                <h2 className="mb-2 text-xl font-semibold capitalize text-white">{category.name}</h2>
            </Box>
        </Card>
    );
};

export default CategoryItem;
