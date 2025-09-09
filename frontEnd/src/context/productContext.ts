import { createContext } from 'react';
import type { Product } from '../types/product';
import type { ProductAction } from './productActions';

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export interface ProductContextType {
    state: ProductState;
    dispatch: React.Dispatch<ProductAction>;
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'SET_LOADING':
        return { ...state, loading: action.payload };

        case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };

        case 'SET_PRODUCTS':
        return { ...state, products: action.payload, loading: false, error: null };

        case 'ADD_PRODUCT':
        return {
            ...state,
            products: [action.payload, ...state.products],
            loading: false,
            error: null
        };

        case 'REMOVE_PRODUCT':
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.payload),
            loading: false,
            error: null
        };

        default:
        return state;
    }
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
