export interface IUserCreate {
    email: string;
    firstName: string;
    id?: number;
    lastName: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserLoginResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
}
