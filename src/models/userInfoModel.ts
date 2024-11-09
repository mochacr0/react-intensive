export interface GetUserInfoResponse {
    status: number;
    message: string;
    data: UserInfo;
}

export interface UserInfo {
    userId: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
}
