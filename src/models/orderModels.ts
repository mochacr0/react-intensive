export type OrderDto = {
    orderNumber: number;
    sku: string;
    status: string;
    rating: number;
    payment: {
        amount: number;
        received: number;
    };
    product: {
        name: string;
        image: string;
        regular_price: number;
        sale_price?: number;
    };
    created: string;
    updated: string;
};

export type GetOrdersDto = {
    status: number;
    message: string;
    data: OrderPaginationDto;
};

export type OrderPaginationDto = {
    totalOrders: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    orders: OrderDto[];
};

export type CreateOrderDto = {
    productId: string;
    quantity: number;
};

export type CreateOrderResponseDto = {
    status: number;
    message: string;
    data: OrderDto;
};
