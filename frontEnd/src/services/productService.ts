import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Product, CreateProductDto, ApiResponse } from '../types/product';

// Configuración base de axios
const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

// Servicio para operaciones con productos
export const productService = {
  // Obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    try {
      const response: AxiosResponse<ApiResponse<Product[]>> = await apiClient.get('/products');
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('No se pudieron cargar los productos');
    }
  },

  // Obtener producto por ID
  async getProductById(id: number): Promise<Product> {
    try {
      const response: AxiosResponse<ApiResponse<Product>> = await apiClient.get(`/products/${id}`);
      if (!response.data.data) {
        throw new Error('Producto no encontrado');
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw new Error('No se pudo cargar el producto');
    }
  },

  // Crear nuevo producto
  async createProduct(productData: CreateProductDto): Promise<Product> {
    try {
      const response: AxiosResponse<ApiResponse<Product>> = await apiClient.post('/products', productData);
      if (!response.data.data) {
        throw new Error('Error al crear el producto');
      }
      return response.data.data;
    } catch (error: unknown) {
      console.error('Error al crear producto:', error);
      
      // Manejar errores específicos de validación
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw new Error('No se pudo crear el producto');
    }
  },

  // Eliminar producto
  async deleteProduct(id: number): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error: unknown) {
      console.error(`Error al eliminar producto ${id}:`, error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Producto no encontrado');
        }
        
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      throw new Error('No se pudo eliminar el producto');
    }
  }
};

export default productService;
