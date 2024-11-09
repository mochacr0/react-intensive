import { BaseRespone } from "./commonModels";

export interface GetCategoriesResponse extends BaseRespone {
    data: PaginatedCategories;
}

interface PaginatedCategories {
    totalcategories: number;
    totalPage: number;
    pageSize: number;
    categories: Category[];
}

export interface Category {
    name: string;
    img: string;
    code: string;
    categoryId: string;
}
