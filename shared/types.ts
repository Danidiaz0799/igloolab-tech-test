export interface BaseProduct {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export interface Product extends BaseProduct {
    price: number;
}
