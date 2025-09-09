import { useEffect, useState, useCallback } from 'react';
import { productService } from '../services/productService';
import { useProducts } from '../hooks/useProducts';
import { productActions } from '../context/productActions';
import './ProductsList.css';

const ProductsList = () => {
  const { state, dispatch } = useProducts();
  const { products, loading, error } = state;
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  // Cargar productos al montar el componente
  const loadProducts = useCallback(async () => {
    dispatch(productActions.setLoading(true));
    try {
      const productsData = await productService.getAllProducts();
      dispatch(productActions.setProducts(productsData));
    } catch (err) {
      dispatch(productActions.setError(err instanceof Error ? err.message : 'Error desconocido'));
    }
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteProduct = useCallback(async (productId: number, productName: string) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${productName}"?`)) {
      return;
    }

    setDeleteLoading(productId);
    try {
      await productService.deleteProduct(productId);
      dispatch(productActions.removeProduct(productId));
    } catch (err) {
      dispatch(productActions.setError(err instanceof Error ? err.message : 'Error al eliminar producto'));
    } finally {
      setDeleteLoading(null);
    }
  }, [dispatch]);

  const formatPrice = useCallback((price: string): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(parseFloat(price));
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  if (loading) {
    return (
      <div className="products-list">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-list">
        <div className="error">
          <h3>Error al cargar productos</h3>
          <p>{error}</p>
          <button onClick={loadProducts} className="btn btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-list">
      <div className="products-header">
        <h2>Lista de Productos</h2>
        <p className="products-count">
          {products.length === 0 ? 'No hay productos' : `${products.length} producto${products.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No hay productos disponibles</h3>
          <p>Agrega tu primer producto usando el formulario de arriba.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{formatPrice(product.price)}</span>
              </div>
              
              <div className="product-body">
                <p className="product-description">{product.description}</p>
              </div>
              
              <div className="product-footer">
                <div className="product-meta">
                  <small className="product-date">
                    Creado: {formatDate(product.created_at)}
                  </small>
                  {product.created_at !== product.updated_at && (
                    <small className="product-date">
                      Actualizado: {formatDate(product.updated_at)}
                    </small>
                  )}
                </div>
                
                <button
                  onClick={() => handleDeleteProduct(product.id, product.name)}
                  disabled={deleteLoading === product.id}
                  className="btn btn-danger"
                >
                  {deleteLoading === product.id ? (
                    <>
                      <span className="spinner-small"></span>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="products-actions">
        <button onClick={loadProducts} className="btn btn-secondary">
          Actualizar Lista
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
