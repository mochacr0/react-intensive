export type GetCategoriesDto = {
    status: number;
    message: string;
    data: CategoryPagination;
};

type CategoryPagination = {
    totalcategories: number;
    totalPage: number;
    pageSize: number;
    categories: CategoryDto[];
};

export type CategoryDto = {
    name: string;
    img: string;
    code: string;
    categoryId: string;
};
