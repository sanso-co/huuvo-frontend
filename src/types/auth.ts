export interface AuthLogin {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
}
