import { BaseRespone } from "./commonModels";

export interface Order {
    orderNumber: number;
    sku: string;
    status: string;
    payment: {
        amount: number;
        received: number;
    };
    product: {
        name: string;
        image?: string;
        regular_price: number;
        sale_price?: number;
    };
    customer: string;
    created: string;
    updated: string;
}

export interface GetOrdersRequest {
    status: number;
    message: string;
    data: PaginatedOrders;
}

interface PaginatedOrders {
    totalOrders: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    orders: Order[];
}

export interface PlaceOrderRequest {
    productId: string;
    quantity: number;
}

export interface PlaceOrderResponse {
    status: number;
    message: string;
    data: Order;
}

export interface CompleteOrderRequest {
    orderNumber: string;
}

export interface CompleteOrderResponse extends BaseRespone {
    data: Order;
}
