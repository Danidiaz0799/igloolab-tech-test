export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  count?: number;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  required_fields?: string[];
}
