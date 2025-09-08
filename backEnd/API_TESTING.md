# API Testing Guide - Gestión de Productos

## Base URL
```
http://localhost:3001
```

## Endpoints Disponibles

### 1. **GET /api/products** - Obtener todos los productos

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop Dell XPS 13",
      "description": "Laptop ultrabook con procesador Intel Core i7...",
      "price": "1299.99",
      "created_at": "2025-09-08T22:21:31.488Z",
      "updated_at": "2025-09-08T22:21:31.488Z"
    }
  ],
  "count": 3,
  "message": "Productos obtenidos exitosamente"
}
```

### 2. **GET /api/products/:id** - Obtener producto por ID

**Ejemplo:** `GET /api/products/1`

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "description": "Laptop ultrabook con procesador Intel Core i7...",
    "price": "1299.99",
    "created_at": "2025-09-08T22:21:31.488Z",
    "updated_at": "2025-09-08T22:21:31.488Z"
  },
  "message": "Producto obtenido exitosamente"
}
```

### 3. **POST /api/products** - Crear nuevo producto

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "MacBook Pro M3",
  "description": "Laptop Apple con chip M3, 16GB RAM, 512GB SSD",
  "price": 1999.99
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "MacBook Pro M3",
    "description": "Laptop Apple con chip M3, 16GB RAM, 512GB SSD",
    "price": "1999.99",
    "created_at": "2025-09-08T22:30:00.000Z",
    "updated_at": "2025-09-08T22:30:00.000Z"
  },
  "message": "Producto creado exitosamente"
}
```

### 4. **DELETE /api/products/:id** - Eliminar producto

**Ejemplo:** `DELETE /api/products/1`

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Producto \"Laptop Dell XPS 13\" eliminado exitosamente",
  "deleted_product": {
    "id": 1,
    "name": "Laptop Dell XPS 13"
  }
}
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Producto creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Producto no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Ejemplos de Errores

### Producto no encontrado
```json
{
  "success": false,
  "message": "Producto con ID 999 no encontrado"
}
```

### Datos inválidos en creación
```json
{
  "success": false,
  "message": "Todos los campos son obligatorios (name, description, price)",
  "required_fields": ["name", "description", "price"]
}
```

### Precio inválido
```json
{
  "success": false,
  "message": "El precio debe ser un número positivo mayor a 0"
}
```

## Testing con curl

### Obtener todos los productos
```bash
curl -X GET http://localhost:3001/api/products
```

### Crear un producto
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto Test",
    "description": "Descripción del producto de prueba",
    "price": 99.99
  }'
```

### Eliminar un producto
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

## Testing con PowerShell (Windows)

### Obtener productos
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method GET
```

### Crear producto
```powershell
$body = @{
    name = "Producto PowerShell"
    description = "Creado desde PowerShell"
    price = 149.99
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method POST -Body $body -ContentType "application/json"
```

### Eliminar producto
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products/1" -Method DELETE
```

## Validaciones Implementadas

### Campos obligatorios
- **name**: string, no vacío, máximo 255 caracteres
- **description**: string, no vacío
- **price**: number, positivo, máximo 99,999,999.99

### Validaciones de ID
- Debe ser un número entero positivo
- Debe existir en la base de datos (para operaciones GET y DELETE)

## Base de Datos

Los datos se almacenan en PostgreSQL con la siguiente estructura:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
