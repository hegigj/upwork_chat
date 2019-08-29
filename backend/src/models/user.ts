export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatarSrc: string;
    birthdate: string;
    qualification: string;
    authToken: string;
    expirationSessionTime: number;
}

export interface SignIn {
    username?: string;
    email?: string;
    password: string;
}

export interface SignUp {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}