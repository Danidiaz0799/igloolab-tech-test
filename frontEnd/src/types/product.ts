// Tipos para la gestión de productos
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Viene como string desde la API
  created_at: string;
  updated_at: string;
}

// Tipo para crear un nuevo producto (sin id y timestamps)
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
}

// Tipo para la respuesta de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  count?: number;
  error?: string;
}

// Tipo para errores de la API
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  required_fields?: string[];
}
