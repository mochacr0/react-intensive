import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Chip, Rating, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductDto } from "../../models/productModels";

type ProductItemProps = {
    product: ProductDto;
    onPlacedOrderButtonClicked: (product: ProductDto) => void;
};

const productUrlSample =
    "https://res.cloudinary.com/delbtan9t/image/upload/v1717744804/343918d9-1c40-45d5-a8eb-45e7ab53bab0.jpg";

const ProductItem: React.FC<ProductItemProps> = ({ product, onPlacedOrderButtonClicked }) => {
    return (
        <Box className="group relative flex flex-col rounded-lg bg-white transition-transform duration-300 hover:scale-[1.02]">
            {/* Image container */}
            <Link to={`/products/${product.id}`} className="relative aspect-square overflow-hidden">
                <img src={productUrlSample} alt={product.name} className="h-full w-full object-cover object-center" />

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
            </Link>

            {/* Product info */}
            <Box className="flex flex-1 flex-col p-4">
                <Link to={`/products/${product.id}`} className="flex-1 no-underline">
                    <Typography variant="h3" className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                        {product.name}
                    </Typography>
                </Link>

                {/* Rating */}
                <Box className="mb-2 flex items-center gap-1">
                    <Rating defaultValue={0} precision={0.1} value={product.rating} readOnly />
                </Box>

                {/* Price and Add to Cart */}
                <Box className="flex items-center justify-between justify-self-end">
                    <p className="text-lg font-medium text-gray-900">${product.sale_price.toFixed(2)}</p>
                    <Button
                        onClick={() => {
                            onPlacedOrderButtonClicked(product);
                        }}
                        disabled={product.in_stock === 0}
                        className="flex items-center gap-1 rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
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
