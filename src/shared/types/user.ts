export interface SafeUser {
    name: string;
    id: number;
    surname?: string;
    partonymic?: string;
    email: string;
    birthday?: string;
    phoneNumber?: string;
    isAdmin: boolean;
}
