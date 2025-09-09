import type { Product, CreateProductDto, ApiResponse } from '../types/product';
import type { Product as SharedProduct } from '../../../shared/types';
import { SHARED_DUMMY_PRODUCTS, STORAGE_KEY } from '../../../shared/dummyData';

const initialProducts: Product[] = SHARED_DUMMY_PRODUCTS.map((product: SharedProduct) => ({
    ...product,
    created_at: product.created_at!,
    updated_at: product.updated_at!
}));

class LocalStorage {
    static getProducts(): Product[] {
        try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            this.saveProducts(initialProducts);
            return [...initialProducts];
        }
        return JSON.parse(stored);
        } catch {
        return [...initialProducts];
        }
    }

    static saveProducts(products: Product[]): void {
        try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch {
        // Silently fail if localStorage is not available
        }
    }

    static getNextId(): number {
        const products = this.getProducts();
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }
}

class DummyDataService {
    private delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

    async getAllProducts(): Promise<ApiResponse<Product[]>> {
        await this.delay();
        const products = LocalStorage.getProducts();
        
        return {
        success: true,
        data: products.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
        message: 'Productos obtenidos exitosamente (datos dummy)',
        count: products.length
        };
    }

    async createProduct(productData: CreateProductDto): Promise<Product> {
        await this.delay();

        this.validateProductData(productData);

        const products = LocalStorage.getProducts();
        const newProduct: Product = {
        id: LocalStorage.getNextId(),
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: productData.price,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
        };

        const updatedProducts = [...products, newProduct];
        LocalStorage.saveProducts(updatedProducts);

        return newProduct;
    }

    async deleteProduct(id: number): Promise<void> {
        await this.delay();

        const products = LocalStorage.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        
        if (filteredProducts.length === products.length) {
        throw new Error('Producto no encontrado');
        }

        LocalStorage.saveProducts(filteredProducts);
    }

    resetData(): void {
        LocalStorage.saveProducts(initialProducts);
    }

    private validateProductData(productData: CreateProductDto): void {
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
