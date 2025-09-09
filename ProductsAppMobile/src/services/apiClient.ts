import axios, { AxiosInstance, AxiosError } from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = 'http://192.168.20.46:3001'; // IP de la máquina host

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    count?: number;
    }

    export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    }

    class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
        baseURL: API_BASE_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
        });
    }

    async getAllProducts(): Promise<Product[]> {
        const response = await this.client.get<ApiResponse<Product[]>>('/api/products');
        return response.data.data;
    }

    async createProduct(productData: CreateProductRequest): Promise<Product> {
        const response = await this.client.post<Product>('/api/products', productData);
        return response.data;
    }

    async deleteProduct(id: number): Promise<void> {
        await this.client.delete(`/api/products/${id}`);
    }

    isNetworkError(error: unknown): boolean {
        if (!error || typeof error !== 'object') return false;

        const axiosError = error as AxiosError;
        return (
        axiosError.code === 'NETWORK_ERROR' ||
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ENOTFOUND' ||
        axiosError.message?.includes('Network Error') ||
        !axiosError.response
        );
    }
}

export const apiClient = new ApiClient();
