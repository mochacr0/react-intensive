export type VerifyDto = {
    userName: string;
    code: string;
};

export type VerifyResponseDto = {
    status: number;
    message: string;
};
