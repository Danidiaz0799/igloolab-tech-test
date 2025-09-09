import type { Product, CreateProductDto, ApiResponse } from '../types/product';

const STORAGE_KEY = 'products_dummy_data';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop Gaming Asus ROG',
    description: 'Laptop para gaming con procesador Intel i7, 16GB RAM, RTX 4060, pantalla 144Hz',
    price: '3200000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Monitor 4K Samsung 27"',
    description: 'Monitor profesional 4K UHD de 27 pulgadas con tecnología QLED y HDR10',
    price: '850000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Teclado Mecánico Corsair',
    description: 'Teclado mecánico gaming con switches Cherry MX y retroiluminación RGB',
    price: '320000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

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
      price: productData.price.toString(),
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
