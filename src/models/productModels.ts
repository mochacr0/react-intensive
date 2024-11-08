export type GetProductsDto = {
    status: number;
    message: string;
    data: ProductPaginationDto;
};

type ProductPaginationDto = {
    totalProducts: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    products: ProductDto[];
};

export type ProductDto = {
    id: string;
    name: string;
    img: string;
    in_stock: number;
    sold: number;
    regular_price: number;
    sale_price: number;
    rating: number;
    category: ProductCategoryDto;
};

type ProductCategoryDto = {
    categoryId: string;
    name: string;
    img: string;
    codelist: string;
};
