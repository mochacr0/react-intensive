const orderStatusColorMap: { [key: string]: "warning" | "success" | "error" | "info" | "secondary" | "default" } = {
    pending: "warning",
    confirmed: "info",
    cancelled: "error",
    completed: "success",
    refunded: "secondary",
};

export function getOrderStatusColor(status: string | null | undefined) {
    return status && orderStatusColorMap[status] ? orderStatusColorMap[status] : "default";
}

export function capitalize(str: string | null | undefined) {
    if (!str) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
