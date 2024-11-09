export type RegisterRequest = {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type RegisterResponse = {
    status: number;
    message: string;
};
