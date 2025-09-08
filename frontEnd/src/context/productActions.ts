import type { Product } from '../types/product';

export type ProductAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: number };

export const productActions = {
  setLoading: (loading: boolean): ProductAction => ({ 
    type: 'SET_LOADING', 
    payload: loading 
  }),
  
  setError: (error: string | null): ProductAction => ({ 
    type: 'SET_ERROR', 
    payload: error 
  }),
  
  setProducts: (products: Product[]): ProductAction => ({ 
    type: 'SET_PRODUCTS', 
    payload: products 
  }),
  
  addProduct: (product: Product): ProductAction => ({ 
    type: 'ADD_PRODUCT', 
    payload: product 
  }),
  
  removeProduct: (productId: number): ProductAction => ({ 
    type: 'REMOVE_PRODUCT', 
    payload: productId 
  }),
};
