import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Product, CreateProductDto, ApiResponse } from '../types/product';
import { dummyDataService } from './dummyDataService';

// Configuración
const API_BASE_URL = 'http://localhost:3001/api';
const API_TIMEOUT = 5000;

// Estados
type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

class ApiClient {
  private client = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: API_TIMEOUT,
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url);
  }

  async post<T>(url: string, data: unknown): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data);
  }

  async delete(url: string): Promise<AxiosResponse<void>> {
    return this.client.delete(url);
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.client.get('/products');
      return true;
    } catch {
      return false;
    }
  }
}

class ProductService {
  private apiClient = new ApiClient();
  private isUsingDummyData = false;
  private connectionStatus: ConnectionStatus = 'checking';

  async getAllProducts(): Promise<Product[]> {
    if (this.isUsingDummyData) {
      return this.getDummyProducts();
    }

    try {
      const response = await this.apiClient.get<ApiResponse<Product[]>>('/products');
      this.setConnected();
      return response.data.data || [];
    } catch {
      this.switchToDummyMode();
      return this.getDummyProducts();
    }
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    if (this.isUsingDummyData) {
      return dummyDataService.createProduct(productData);
    }

    try {
      const response = await this.apiClient.post<ApiResponse<Product>>('/products', productData);
      if (!response.data.data) {
        throw new Error('Respuesta inválida del servidor');
      }
      this.setConnected();
      return response.data.data;
    } catch (error) {
      if (this.isServerError(error)) {
        this.switchToDummyMode();
        return dummyDataService.createProduct(productData);
      }
      
      if (this.isValidationError(error)) {
        const axiosError = error as { response: { data: { required_fields?: string[]; message?: string } } };
        const errorData = axiosError.response.data;
        throw new Error(
          errorData.required_fields 
            ? `Campos requeridos: ${errorData.required_fields.join(', ')}`
            : errorData.message || 'Datos inválidos'
        );
      }
      
      throw new Error(error instanceof Error ? error.message : 'Error al crear producto');
    }
  }

  async deleteProduct(id: number): Promise<void> {
    if (this.isUsingDummyData) {
      return dummyDataService.deleteProduct(id);
    }

    try {
      await this.apiClient.delete(`/products/${id}`);
      this.setConnected();
    } catch (error) {
      if (this.isServerError(error)) {
        this.switchToDummyMode();
        return dummyDataService.deleteProduct(id);
      }
      
      if (this.isNotFoundError(error)) {
        throw new Error('Producto no encontrado');
      }
      
      throw new Error(error instanceof Error ? error.message : 'Error al eliminar producto');
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  isUsingDummy(): boolean {
    return this.isUsingDummyData;
  }

  async switchToDummyMode(): Promise<void> {
    this.isUsingDummyData = true;
    this.connectionStatus = 'disconnected';
  }

  async switchToApiMode(): Promise<boolean> {
    const isConnected = await this.apiClient.checkConnection();
    if (isConnected) {
      this.isUsingDummyData = false;
      this.setConnected();
      return true;
    }
    return false;
  }

  async checkConnection(): Promise<boolean> {
    this.connectionStatus = 'checking';
    const isConnected = await this.apiClient.checkConnection();
    this.connectionStatus = isConnected ? 'connected' : 'disconnected';
    return isConnected;
  }

  resetDummyData(): void {
    dummyDataService.resetData();
  }

  private async getDummyProducts(): Promise<Product[]> {
    try {
      const response = await dummyDataService.getAllProducts();
      return response.data || [];
    } catch {
      throw new Error('Error al cargar productos dummy');
    }
  }

  private setConnected(): void {
    this.connectionStatus = 'connected';
  }

  private isServerError(error: unknown): boolean {
    return axios.isAxiosError(error) && 
           (error.code === 'ECONNREFUSED' || 
            (error.response?.status !== undefined && error.response.status >= 500));
  }

  private isValidationError(error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 400;
  }

  private isNotFoundError(error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 404;
  }
}

export const productService = new ProductService();
