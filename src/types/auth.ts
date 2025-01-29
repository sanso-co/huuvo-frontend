export interface AuthLogin {
    username: string;
    password: string;
}

export interface LoginResponse {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    avatar: string | null;
}
