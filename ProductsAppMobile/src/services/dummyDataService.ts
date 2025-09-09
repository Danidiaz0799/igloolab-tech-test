import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';
import { MOBILE_DUMMY_PRODUCTS, STORAGE_KEY } from '../data/sharedData';

class AsyncStorageManager {
    static async getProducts(): Promise<Product[]> {
        try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!stored) {
            await this.saveProducts(MOBILE_DUMMY_PRODUCTS);
            return [...MOBILE_DUMMY_PRODUCTS];
        }
        return JSON.parse(stored);
        } catch {
        return [...MOBILE_DUMMY_PRODUCTS];
        }
    }

    static async saveProducts(products: Product[]): Promise<void> {
        try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch {
        // Silently fail if AsyncStorage is not available
        }
    }

    static async getNextId(): Promise<number> {
        const products = await this.getProducts();
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }

    static async clearData(): Promise<void> {
        try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        } catch {
        // Silently fail
        }
    }
    }

    export class DummyDataService {
    private delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

    async getAllProducts(): Promise<Product[]> {
        await this.delay();
        const products = await AsyncStorageManager.getProducts();

        return products.sort((a, b) =>
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
    }

    async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
        await this.delay();

        this.validateProductData(productData);

        const products = await AsyncStorageManager.getProducts();
        const newProduct: Product = {
        id: await AsyncStorageManager.getNextId(),
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: productData.price,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
        };

        const updatedProducts = [...products, newProduct];
        await AsyncStorageManager.saveProducts(updatedProducts);

        return newProduct;
    }

    async deleteProduct(id: number): Promise<void> {
        await this.delay();

        const products = await AsyncStorageManager.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);

        if (filteredProducts.length === products.length) {
        throw new Error('Producto no encontrado');
        }

        await AsyncStorageManager.saveProducts(filteredProducts);
    }

    async resetData(): Promise<void> {
        await AsyncStorageManager.saveProducts(MOBILE_DUMMY_PRODUCTS);
    }

    private validateProductData(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): void {
        if (!productData.name?.trim()) {
        throw new Error('El nombre del producto es requerido');
        }
        if (!productData.description?.trim()) {
        throw new Error('La descripción del producto es requerida');
        }
        if (!productData.price || productData.price <= 0) {
        throw new Error('El precio debe ser mayor a 0');
        }
    }
}

export const dummyDataService = new DummyDataService();
