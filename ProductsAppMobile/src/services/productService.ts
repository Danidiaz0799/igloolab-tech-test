import { Product } from '../types/product';
import { apiClient, CreateProductRequest } from './apiClient';
import { dummyDataService } from './dummyDataService';

export type ConnectionStatus = 'api' | 'dummy' | 'loading';

class ProductService {
    private connectionStatus: ConnectionStatus = 'loading';
    private statusListeners: Array<(status: ConnectionStatus) => void> = [];

    getConnectionStatus(): ConnectionStatus {
        return this.connectionStatus;
    }

    onStatusChange(listener: (status: ConnectionStatus) => void): () => void {
        this.statusListeners.push(listener);
        return () => {
        this.statusListeners = this.statusListeners.filter(l => l !== listener);
        };
    }

    private notifyStatusChange(status: ConnectionStatus): void {
        this.connectionStatus = status;
        this.statusListeners.forEach(listener => listener(status));
    }

    async getAllProducts(): Promise<Product[]> {
        try {
        this.notifyStatusChange('loading');

        const apiProducts = await apiClient.getAllProducts();
        this.notifyStatusChange('api');

        return apiProducts.map(product => ({
            ...product,
            price: typeof product.price === 'string' ?
            parseFloat(product.price) : product.price
        }));

        } catch (error) {
        console.log('API no disponible, usando datos dummy:', error);

        try {
            const dummyProducts = await dummyDataService.getAllProducts();
            this.notifyStatusChange('dummy');
            return dummyProducts;

        } catch (dummyError) {
            console.error('Error al obtener datos dummy:', dummyError);
            this.notifyStatusChange('dummy');
            return [];
        }
        }
    }

    async createProduct(productData: CreateProductRequest): Promise<Product> {
        try {
        if (this.connectionStatus === 'api') {
            const newProduct = await apiClient.createProduct(productData);
            return {
            ...newProduct,
            price: typeof newProduct.price === 'string' ? 
                parseFloat(newProduct.price) : newProduct.price
            };
        }
        } catch (error) {
        console.log('Error en API, creando en datos dummy:', error);
        this.notifyStatusChange('dummy');
        }

        return await dummyDataService.createProduct(productData);
    }

    async deleteProduct(id: number): Promise<void> {
        try {
        if (this.connectionStatus === 'api') {
            await apiClient.deleteProduct(id);
            return;
        }
        } catch (error) {
        console.log('Error en API, eliminando de datos dummy:', error);
        this.notifyStatusChange('dummy');
        }

        await dummyDataService.deleteProduct(id);
    }

    async resetData(): Promise<void> {
        if (this.connectionStatus === 'dummy') {
        await dummyDataService.resetData();
        }
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        }).format(price);
    }

    async checkApiConnection(): Promise<boolean> {
        try {
        await apiClient.getAllProducts();
        return true;
        } catch {
        return false;
        }
    }
}

export const productService = new ProductService();
