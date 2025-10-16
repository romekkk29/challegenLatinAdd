export interface User {
    name: string;
    email: string;
}

export interface UserResponse extends User{
    token: string
}



export interface AuthBody {
    email: string;
    password: string;
}