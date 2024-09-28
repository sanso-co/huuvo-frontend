export interface AuthLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}
