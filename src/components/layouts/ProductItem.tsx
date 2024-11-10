import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Rating, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../models/productModels";
import { SAMPLE_IMAGE_URL } from "../../common/mock/productSamples";

type ProductItemProps = {
    product: Product;
    onPlacedOrderButtonClicked: (product: Product) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onPlacedOrderButtonClicked }) => {
    return (
        <Box className="group relative flex flex-col rounded-lg bg-white transition-transform duration-300 hover:scale-[1.02]">
            {/* Image container */}
            <Box className="relative aspect-square overflow-hidden">
                <img src={SAMPLE_IMAGE_URL} alt={product.name} className="h-full w-full object-cover object-center" />

                {/* Stock badge */}
                <Box className="absolute left-2 top-2">
                    {product.in_stock > 0 ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            In Stock ({product.in_stock})
                        </span>
                    ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            Out of Stock
                        </span>
                    )}
                </Box>
            </Box>

            {/* Product info */}
            <Box className="flex flex-1 flex-col gap-2 p-4">
                <Link to={`/products/${product.id}`} className="flex-1 no-underline">
                    <Typography variant="h3" className="mb-2 line-clamp-1 text-base font-medium text-gray-900">
                        {product.name}
                    </Typography>
                </Link>

                {/* Rating */}
                <Box className="mb-2 flex items-center justify-center md:justify-start">
                    <Rating defaultValue={0} precision={0.1} value={product.rating} readOnly size="small" />
                </Box>

                {/* Price and Add to Cart */}
                <Box className="flex flex-col items-center justify-between gap-2 justify-self-end md:flex-row md:gap-0">
                    <Typography variant="body2" className="text-lg font-medium text-gray-900">
                        ${product.sale_price.toFixed(2)}
                    </Typography>
                    <Button
                        onClick={() => {
                            onPlacedOrderButtonClicked(product);
                        }}
                        disabled={product.in_stock === 0}
                        className="flex w-full items-center gap-1 rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 md:w-auto"
                        aria-label="Add to cart"
                    >
                        <AddShoppingCartIcon className="h-4 w-4" />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductItem;
