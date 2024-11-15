import { Box } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { Product } from "../models/productModels";
import { useGetProductsQuery } from "../redux/features/productApiSlice";
import Loading from "./Loading";
import ProductItem from "./ProductItem";
import PlaceOrderDiablog from "./PlaceOrderDiablog";

const MemoizedProductItem = memo(ProductItem);

const ProductCatalog = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { data, isLoading } = useGetProductsQuery();

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handlePlaceOrderButtonClicked = useCallback((product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    return (
        <Box className="mb-10 mt-20 w-full">
            <h2 className="mb-6 text-center text-2xl font-medium uppercase text-gray-800">Our Products</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <Box className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {(data?.data?.products || []).map((product) => (
                        <MemoizedProductItem
                            key={product.id}
                            product={product}
                            onPlacedOrderButtonClicked={handlePlaceOrderButtonClicked}
                        />
                    ))}
                </Box>
            )}
            {selectedProduct && (
                <PlaceOrderDiablog
                    isOpen={isModalOpen}
                    onOpen={handleOpenModal}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </Box>
    );
};

export default memo(ProductCatalog);
