export type RegisterDto = {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type RegisterResponseDto = {
    status: number;
    message: string;
};
