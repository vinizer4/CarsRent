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
