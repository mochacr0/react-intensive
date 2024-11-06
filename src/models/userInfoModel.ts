export type UserInfoDto = {
    status: number;
    message: string;
    data: {
        userId: string;
        userName: string;
        email: string;
        firstName: string;
        lastName: string;
    };
};
