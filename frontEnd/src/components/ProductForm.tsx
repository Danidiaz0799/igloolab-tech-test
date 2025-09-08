import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { productService } from '../services/productService';
import { useProducts } from '../hooks/useProducts';
import { productActions } from '../context/productActions';
import type { CreateProductDto } from '../types/product';
import './ProductForm.css';

interface FormData {
  name: string;
  description: string;
  price: string;
}

const ProductForm: React.FC = () => {
  const { dispatch } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      price: ''
    }
  });

  const watchedFields = watch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Convertir el precio a number
      const productData: CreateProductDto = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: parseFloat(data.price)
      };

      const newProduct = await productService.createProduct(productData);
      
      // Actualizar el estado global
      dispatch(productActions.addProduct(newProduct));
      
      // Mostrar éxito y resetear formulario
      setSubmitSuccess(true);
      reset();
      
      // Quitar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      dispatch(productActions.setError(
        error instanceof Error ? error.message : 'Error al crear producto'
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPricePreview = (price: string) => {
    if (!price) return '';
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(numericPrice);
  };

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <h2>Agregar Nuevo Producto</h2>
        <p>Completa la información del producto que deseas agregar</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          ¡Producto creado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre del Producto *
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Ej: iPhone 14 Pro"
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 100,
                message: 'El nombre no puede exceder 100 caracteres'
              },
              pattern: {
                value: /^[a-zA-Z0-9\s\-_.,()]+$/,
                message: 'El nombre contiene caracteres no válidos'
              }
            })}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
          <div className="form-help">
            {watchedFields.name?.length || 0}/100 caracteres
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Describe las características principales del producto..."
            rows={4}
            {...register('description', {
              required: 'La descripción es obligatoria',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres'
              },
              maxLength: {
                value: 500,
                message: 'La descripción no puede exceder 500 caracteres'
              }
            })}
          />
          {errors.description && (
            <span className="form-error">{errors.description.message}</span>
          )}
          <div className="form-help">
            {watchedFields.description?.length || 0}/500 caracteres
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Precio (COP) *
          </label>
          <div className="price-input-container">
            <span className="price-symbol">$</span>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className={`form-input price-input ${errors.price ? 'error' : ''}`}
              placeholder="0.00"
              {...register('price', {
                required: 'El precio es obligatorio',
                min: {
                  value: 0.01,
                  message: 'El precio debe ser mayor a 0'
                },
                max: {
                  value: 999999999.99,
                  message: 'El precio es demasiado alto'
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Ingresa un precio válido (máximo 2 decimales)'
                }
              })}
            />
          </div>
          {errors.price && (
            <span className="form-error">{errors.price.message}</span>
          )}
          {watchedFields.price && !errors.price && (
            <div className="form-help price-preview">
              Vista previa: {formatPricePreview(watchedFields.price)}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-small"></span>
                Creando...
              </>
            ) : (
              'Crear Producto'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
