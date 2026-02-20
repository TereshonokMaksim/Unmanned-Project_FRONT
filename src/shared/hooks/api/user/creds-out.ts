export interface AuthErrorResponse {
    message: string
}

export interface JWTResponse {
    token: string
}

export type GenericCredentialsOutput<CredentialsType> = [
    (credentials: CredentialsType) => Promise<AuthErrorResponse | JWTResponse>,
    {
        isLoading: boolean,
        error: string | null
    }
]

export interface UseMeOut {
    name: string;
    id: number;
    surname?: string;
    partonymic?: string;
    email: string;
    birthday?: string;
    phoneNumber?: string;
    isAdmin: boolean;
}