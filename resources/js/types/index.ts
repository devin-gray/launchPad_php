export interface Role {
    id: number;
    name: string;
    slug: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    roles: Role[];
} 