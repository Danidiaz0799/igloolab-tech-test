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

-- Insertar datos de prueba (opcional)
INSERT INTO products (name, description, price) VALUES
('iPhone 15 Pro', 'Smartphone Apple con chip A17 Pro y pantalla de 6.1 pulgadas', 4500000.00),
('Samsung Galaxy S24', 'Teléfono Android con cámara de 108MP y 256GB de almacenamiento', 3200000.00),
('MacBook Air M2', 'Laptop ultraligera con chip M2, 8GB RAM y 256GB SSD', 5800000.00),
('AirPods Pro', 'Audífonos inalámbricos con cancelación activa de ruido', 890000.00);

-- Verificar la creación
SELECT * FROM products ORDER BY created_at DESC;
