-- Crear la base de datos (esto se hace automáticamente con las variables de entorno de Docker)
-- CREATE DATABASE products_db;

-- Conectar a la base de datos
\c products_db;

-- Crear la tabla products (compatible con PostgreSQL)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear un trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE
    ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insertar algunos datos de ejemplo
INSERT INTO products (name, description, price) VALUES
('Laptop Dell XPS 13', 'Laptop ultrabook con procesador Intel Core i7, 16GB RAM, 512GB SSD', 1299.99),
('iPhone 15 Pro', 'Smartphone Apple con chip A17 Pro, cámara de 48MP, 256GB almacenamiento', 999.99),
('Auriculares Sony WH-1000XM5', 'Auriculares inalámbricos con cancelación de ruido activa', 349.99),
('Monitor Samsung 27"', 'Monitor 4K UHD de 27 pulgadas con tecnología QLED', 459.99),
('Teclado Mecánico Logitech', 'Teclado mecánico gaming con switches azules y retroiluminación RGB', 129.99);

-- Verificar la inserción
SELECT * FROM products;
