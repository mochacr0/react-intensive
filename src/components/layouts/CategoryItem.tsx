import React from "react";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { Box, Card } from "@mui/material";
import { CategoryDto } from "../../models/categoryModels";

const categorySampleImageUrl =
    "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg";

const CategoryItem: React.FC<{ category: CategoryDto }> = ({ category }) => {
    return (
        <Card className="w-30 group relative aspect-square overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <Link to={`/products/?categoryIds=${category.categoryId}`}>
                {/* Image */}
                <img src={categorySampleImageUrl} alt={category.name} className="h-full w-full object-cover" />

                {/* Overlay - Only visible on hover */}
                <Box className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content container */}
                <Box className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {/* Category name */}
                    <h2 className="mb-2 text-xl font-semibold capitalize text-white">{category.name}</h2>

                    {/* View collection text */}
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <span className="font-medium">View Collection</span>
                        <ArrowForward className="h-4 w-4" />
                    </div>
                </Box>
            </Link>
        </Card>
    );
};

export default CategoryItem;
