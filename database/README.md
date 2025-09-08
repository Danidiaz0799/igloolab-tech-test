# Configuración de Base de Datos

Este directorio contiene los scripts y archivos de configuración para la base de datos MySQL.

## Archivos incluidos:

- `init.sql`: Script de inicialización que crea la base de datos, tablas y datos de ejemplo
- `README.md`: Este archivo con instrucciones

## Configuración MySQL

### Opción 1: MySQL Local

1. Instalar MySQL Server en tu sistema
2. Crear un usuario y base de datos:
   ```sql
   CREATE DATABASE products_db;
   CREATE USER 'products_user'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON products_db.* TO 'products_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Ejecutar el script de inicialización:
   ```bash
   mysql -u products_user -p products_db < init.sql
   ```

### Opción 2: Docker (Recomendado)

1. Crear un archivo `docker-compose.yml` en la raíz del proyecto:
   ```yaml
   version: '3.8'
   services:
     mysql:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: products_db
         MYSQL_USER: products_user
         MYSQL_PASSWORD: password
       ports:
         - "3306:3306"
       volumes:
         - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
         - mysql_data:/var/lib/mysql
   
   volumes:
     mysql_data:
   ```

2. Ejecutar Docker Compose:
   ```bash
   docker-compose up -d
   ```

## Configuración del Backend

Asegúrate de que las variables de entorno en `.env` del backend coincidan con tu configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=products_user  # o root si usas el usuario root
DB_PASSWORD=password
DB_NAME=products_db
```

## Estructura de la tabla products

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
