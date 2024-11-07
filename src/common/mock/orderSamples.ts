import { OrderDto } from "../../models/orderModels";

export const orderSamples: OrderDto[] = [
    {
        orderNumber: 123456,
        sku: "123456FR",
        status: "completed",
        rating: 3.5,
        category: "electronics",
        payment: {
            amount: 600,
            received: 600,
        },
        product: {
            name: "Oculus Quest 2 VR Headset 64 GB",
            image: "1.webp",
            regular_price: 600,
            sale_price: 559,
        },
    },
    {
        orderNumber: 154844,
        sku: "598741FR",
        status: "confirmed",
        rating: 4.5,
        category: "fashion",
        payment: {
            amount: 4000,
            received: 180,
        },
        product: {
            name: "Levis Standard Issue Backpack Black",
            image: "2.webp",
            regular_price: 100,
        },
    },
    {
        orderNumber: 202587,
        sku: "485912TY",
        status: "cancelled",
        rating: 4.5,
        category: "electronics",
        payment: {
            amount: 200,
            received: 0,
        },
        product: {
            name: "Xiaomi WiFI Repeater Pro",
            image: "3.webp",
            regular_price: 200,
            sale_price: 180,
        },
    },
    {
        orderNumber: 300411,
        sku: "365487RT",
        status: "confirmed",
        rating: 4.5,
        category: "services",
        payment: {
            amount: 9.99,
            received: 9.99,
        },
        product: {
            name: "UPS Express Shipping",
            image: "4.webp",
            regular_price: 9.99,
        },
    },
    {
        orderNumber: 785241,
        sku: "002315ES",
        status: "confirmed",
        rating: 4.5,
        category: "fashion",
        payment: {
            amount: 40,
            received: 40,
        },
        product: {
            name: "Parfois Woman Flower Backpack",
            image: "5.webp",
            regular_price: 20,
            sale_price: 15.99,
        },
    },
    {
        orderNumber: 458745,
        sku: "541125FR",
        status: "completed",
        rating: 0,
        category: "food",
        payment: {
            amount: 129.54,
            received: 129.54,
        },
        product: {
            name: "Goodwill Sanctuary Sanca Olive Oil 5L",
            image: "6.webp",
            regular_price: 129.54,
        },
    },
    {
        orderNumber: 105488,
        sku: "252596FR",
        status: "confirmed",
        rating: 5,
        category: "food",
        payment: {
            amount: 78.99,
            received: 52.18,
        },
        product: {
            name: "Guylian Seashells Belgian Chocolate 1kg",
            image: "7.webp",
            regular_price: 78.99,
            sale_price: 69.99,
        },
    },
    {
        orderNumber: 900541,
        sku: "002315BN",
        status: "cancelled",
        rating: 0,
        category: "fashion",
        payment: {
            amount: 118.99,
            received: 0,
        },
        product: {
            name: "Puma Crossbody Bag Black Unisex",
            image: "8.webp",
            regular_price: 118.99,
            sale_price: 99.99,
        },
    },
    {
        orderNumber: 121844,
        sku: "814315LP",
        status: "refunded",
        rating: 0,
        category: "services",
        payment: {
            amount: 9.99,
            received: 0,
        },
        product: {
            name: "Sustainable packaging services for 1 item",
            image: "9.webp",
            regular_price: 9.99,
        },
    },
    {
        orderNumber: 240412,
        sku: "361087RT",
        status: "completed",
        rating: 4.5,
        category: "electronics",
        payment: {
            amount: 200,
            received: 200,
        },
        product: {
            name: "SteamDeck Gaming Console 64 GB",
            image: "10.webp",
            regular_price: 200,
            sale_price: 180,
        },
    },
];
