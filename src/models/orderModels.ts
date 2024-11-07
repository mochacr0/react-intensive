export type OrderDto = {
    orderNumber: number;
    sku: string;
    status: string;
    rating: number;
    category: string;
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
};
