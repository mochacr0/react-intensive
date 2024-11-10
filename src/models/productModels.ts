import { BaseRespone } from "./commonModels";

export interface GetProductResponse extends BaseRespone {
    data: PaginatedProducts;
}

interface PaginatedProducts {
    totalProducts: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    products: Product[];
}

export interface Product {
    id: string;
    name: string;
    img: string;
    in_stock: number;
    sold: number;
    regular_price: number;
    sale_price: number;
    rating: number;
    category: ProductCategory;
}

interface ProductCategory {
    categoryId: string;
    name: string;
    img: string;
    code: string;
}

export interface AddProductRequest {
    id: string;
    name: string;
    img: string;
    category: string;
    in_stock: number;
    sold: number;
    regular_price: number;
    sale_price: number;
    rating: number;
}

export interface AddProductResponse extends BaseRespone {}
