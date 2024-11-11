import { Category, GetCategoriesResponse } from "../../models/categoryModels";
import { baseApiSlice } from "./baseApiSlice";

const categoryApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategoriesResponse, void>({
            query: () => ({ url: `/api/shop/categories` }),
            transformResponse: (response: GetCategoriesResponse) => {
                const filteredCategories = response.data.categories.filter(
                    (category: Category) => category.code !== null && category.code !== undefined,
                );
                return {
                    ...response,
                    data: {
                        ...response.data,
                        categories: filteredCategories,
                        totalcategories: filteredCategories.length,
                        totalPage: Math.ceil(filteredCategories.length / response.data.pageSize),
                    },
                };
            },
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
