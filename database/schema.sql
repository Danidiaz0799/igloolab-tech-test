-- Script SQL para crear la tabla de productos en PostgreSQL
-- Sistema de Gestión de Productos - IglooLab Tech Test

-- Conectarse a la base de datos products_db
-- (La base de datos se crea automáticamente con Docker)

-- Eliminar tabla si existe (para desarrollo)
DROP TABLE IF EXISTS products;

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimización
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);
