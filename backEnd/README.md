# 🔧 Backend - API REST Sistema de Gestión de Productos

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista y flexible
- **TypeScript** - Tipado estático para JavaScript
- **TypeORM** - ORM moderno para TypeScript/JavaScript
- **PostgreSQL** - Base de datos relacional
- **dotenv** - Gestión de variables de entorno
- **CORS** - Cross-Origin Resource Sharing

## 📁 Estructura del Proyecto

```
src/
├── controllers/         # Controladores de la API
│   └── ProductController.ts # Lógica de negocio de productos
├── entities/            # Entidades de base de datos
│   └── Product.ts       # Modelo de producto con TypeORM
├── routes/              # Definición de rutas
│   └── productRoutes.ts # Rutas de productos
├── config/              # Configuración
│   └── database.ts      # Configuración TypeORM
└── index.ts             # Servidor Express y punto de entrada
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js v18+
- npm v8+
- PostgreSQL (vía Docker recomendado)

### Comandos
```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Construcción para producción
npm run build

# Ejecutar en producción
npm start

# Verificar conexión a base de datos
npm run test-db
```

## ⚙️ Configuración

### Variables de Entorno (.env)
```env
# Configuración de la base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_DATABASE=productos_db

# Configuración del servidor
PORT=3001
NODE_ENV=development
```

### Scripts Disponibles
- `dev` - Servidor de desarrollo con nodemon y ts-node
- `build` - Compilación TypeScript a JavaScript
- `start` - Ejecutar versión compilada en producción
- `test-db` - Test de conexión a base de datos

## 🏗️ Arquitectura

### Patrón MVC (Model-View-Controller)
- **Models** - Entidades TypeORM (`entities/`)
- **Controllers** - Lógica de negocio (`controllers/`)
- **Routes** - Definición de endpoints (`routes/`)

### Base de Datos
```typescript
// Product Entity
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

## 📊 API Endpoints

### Productos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Obtener todos los productos | No |
| POST | `/api/products` | Crear nuevo producto | No |
| GET | `/api/products/:id` | Obtener producto por ID | No |
| DELETE | `/api/products/:id` | Eliminar producto | No |

### Ejemplos de Uso

#### GET /api/products
```bash
curl -X GET http://localhost:3001/api/products
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "description": "Smartphone Apple con chip A17 Pro",
      "price": "4500000.00",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1,
  "message": "Productos obtenidos exitosamente"
}
```

#### POST /api/products
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "description": "Teléfono Android con 256GB",
    "price": 3200000
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Samsung Galaxy S24",
    "description": "Teléfono Android con 256GB",
    "price": "3200000.00",
    "created_at": "2024-01-15T11:00:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z"
  },
  "message": "Producto creado exitosamente"
}
```

#### DELETE /api/products/:id
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Producto \"iPhone 15 Pro\" eliminado exitosamente",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro"
  }
}
```

## 🛡️ Validaciones

### Validaciones de Entrada
- **name** - Requerido, string, 1-100 caracteres
- **description** - Requerido, string, 1-500 caracteres  
- **price** - Requerido, number, >= 0, <= 999,999,999.99

### Validaciones de ID
- Debe ser número entero positivo
- Verificación de existencia en base de datos

### Manejo de Errores
```json
// Error de validación
{
  "success": false,
  "message": "Todos los campos son obligatorios (name, description, price)",
  "required_fields": ["name", "description", "price"]
}

// Error de no encontrado
{
  "success": false,
  "message": "Producto con ID 999 no encontrado"
}

// Error interno
{
  "success": false,
  "message": "Error interno del servidor"
}
```

## 🗄️ Base de Datos

### Configuración TypeORM
```typescript
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Solo para desarrollo
    logging: process.env.NODE_ENV === 'development',
    entities: [Product],
});
```

### Schema de Productos
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📊 Dependencias

### Producción
```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "pg": "^8.16.3",
  "reflect-metadata": "^0.2.2",
  "typeorm": "^0.3.26"
}
```

### Desarrollo
```json
{
  "@types/cors": "^2.8.19",
  "@types/express": "^5.0.3",
  "@types/node": "^24.3.1",
  "@types/pg": "^8.15.5",
  "nodemon": "^3.1.10",
  "ts-node": "^10.9.2",
  "typescript": "^5.9.2"
}
```

## 🔧 Configuración de Desarrollo

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Middleware Configurado
- **CORS** - Permitir requests desde frontend
- **express.json()** - Parsing de JSON bodies
- **Error handling** - Manejo centralizado de errores

## 🧪 Testing

### Tests Manuales con Postman
- ✅ GET /api/products - Listar productos
- ✅ POST /api/products - Crear producto válido
- ✅ POST /api/products - Validación de campos
- ✅ DELETE /api/products/:id - Eliminar existente
- ✅ DELETE /api/products/:id - ID inexistente

### Próximos Tests Automatizados
- [ ] Tests unitarios con Jest
- [ ] Tests de integración con Supertest
- [ ] Tests de base de datos con test database

## 🚀 Deploy

### Build para Producción
```bash
npm run build
```

### Variables de Entorno para Producción
```env
NODE_ENV=production
DB_HOST=production-db-host
DB_PORT=5432
DB_USERNAME=production-user
DB_PASSWORD=secure-password
DB_DATABASE=production_db
PORT=3001
```

### Opciones de Deployment
- **Railway** - `railway deploy`
- **Heroku** - `git push heroku main`
- **DigitalOcean** - App Platform
- **AWS** - Elastic Beanstalk

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de Conexión a BD
```bash
# Verificar PostgreSQL esté ejecutándose
docker-compose ps

# Ver logs de la base de datos
docker-compose logs postgres

# Test de conexión
npm run test-db
```

#### Error de Puerto Ocupado
```bash
# Cambiar puerto en .env
PORT=3002

# O matar proceso en puerto 3001
npx kill-port 3001
```

#### Error de TypeORM
- Verificar variables de entorno en `.env`
- Asegurar que la base de datos `productos_db` exista
- Revisar logs en consola para errores específicos

### Logs de Desarrollo
- Logs de TypeORM habilitados en desarrollo
- Errores detallados en NODE_ENV=development
- Middleware de logging para requests HTTP

## 📚 Recursos

- [Express.js Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
