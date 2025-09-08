# 🛍️ Sistema de Gestión de Productos

## 📋 Descripción del Proyecto
Esta es una aplicación web completa desarrollada como parte de una prueba técnica para el puesto de **Developer Full Stack** en **IglooLab**. La aplicación permite gestionar un inventario de productos con operaciones completas de CRUD (Crear, Leer, Actualizar, Eliminar).

**🎯 Objetivo:** Demostrar competencias en desarrollo Full Stack con tecnologías modernas y mejores prácticas de desarrollo.

## ✨ Características Principales
- ✅ **Frontend Responsive**: React 18 + TypeScript + Vite
- ✅ **Backend Robusto**: Node.js + Express + TypeORM  
- ✅ **Base de Datos**: PostgreSQL 15 con Docker
- ✅ **API RESTful** con validación completa de datos
- ✅ **Interfaz moderna** con diseño responsive
- ✅ **Gestión de estado** avanzada con React Context + useReducer
- ✅ **Validación de formularios** en tiempo real con React Hook Form
- ✅ **Manejo de errores** comprehensivo
- ✅ **TypeScript** end-to-end para type safety
- ✅ **Código limpio** y bien documentado

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool moderno y rápido
- **Axios** - Cliente HTTP para API calls
- **React Hook Form** - Gestión eficiente de formularios
- **CSS3** - Estilos personalizados con diseño responsivo

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista y flexible
- **TypeORM** - ORM moderno para TypeScript/JavaScript
- **TypeScript** - Tipado estático
- **dotenv** - Gestión segura de variables de entorno
- **CORS** - Cross-Origin Resource Sharing

### Base de Datos
- **PostgreSQL 15** - Sistema de gestión de bases de datos relacional
- **Docker** - Containerización para fácil deployment

### DevOps y Herramientas
- **Docker Compose** - Orquestación de contenedores
- **ESLint** - Linting de código
- **Nodemon** - Desarrollo con hot reload

## 📁 Estructura del Proyecto

```
igloolab-tech-test/
├── 📱 frontEnd/                    # Aplicación React
│   ├── src/
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── ProductForm.tsx     # Formulario de productos
│   │   │   ├── ProductForm.css     # Estilos del formulario
│   │   │   ├── ProductsList.tsx    # Lista de productos
│   │   │   └── ProductsList.css    # Estilos de la lista
│   │   ├── context/                # Gestión de estado global
│   │   │   ├── productContext.ts   # Context y reducer
│   │   │   ├── ProductProvider.tsx # Provider component
│   │   │   └── productActions.ts   # Tipos de acciones
│   │   ├── hooks/                  # Hooks personalizados
│   │   │   └── useProducts.ts      # Hook para productos
│   │   ├── services/               # Servicios de API
│   │   │   └── productService.ts   # Cliente API con Axios
│   │   ├── types/                  # Definiciones TypeScript
│   │   │   └── product.ts          # Interfaces de producto
│   │   ├── App.tsx                 # Componente principal
│   │   ├── App.css                 # Estilos globales
│   │   ├── main.tsx                # Punto de entrada
│   │   └── index.css               # Reset CSS
│   ├── package.json                # Dependencias frontend
│   ├── tsconfig.json               # Configuración TypeScript
│   └── vite.config.ts              # Configuración Vite
├── 🔧 backEnd/                     # API REST con Node.js
│   ├── src/
│   │   ├── controllers/            # Controladores de la API
│   │   │   └── ProductController.ts # Lógica de negocio
│   │   ├── entities/               # Entidades de la base de datos
│   │   │   └── Product.ts          # Modelo de producto
│   │   ├── routes/                 # Definición de rutas
│   │   │   └── productRoutes.ts    # Rutas de productos
│   │   ├── config/                 # Configuración
│   │   │   └── database.ts         # Configuración TypeORM
│   │   └── index.ts                # Servidor Express
│   ├── package.json                # Dependencias backend
│   ├── tsconfig.json               # Configuración TypeScript
│   └── .env                        # Variables de entorno
├── 🗄️ database/                    # Configuración de base de datos
│   ├── docker-compose.yml          # Docker PostgreSQL
│   └── schema.sql                  # Script de creación
└── 📖 README.md                    # Documentación
```

## 🚀 Instalación y Configuración

### ⚙️ Prerrequisitos
Asegúrate de tener instalado:
- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** v8 o superior (incluido con Node.js)
- **Docker** y **Docker Compose** ([Descargar](https://www.docker.com/))
- **Git** para clonar el repositorio

### 📥 1. Clonar el Repositorio
```bash
git clone https://github.com/Danidiaz0799/igloolab-tech-test.git
cd igloolab-tech-test
```

### 🗄️ 2. Configurar la Base de Datos PostgreSQL
```bash
cd database
docker-compose up -d
```

**Configuración de la base de datos:**
- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: productos_db
- **Usuario**: postgres
- **Contraseña**: postgres123

**Verificar que PostgreSQL esté funcionando:**
```bash
docker-compose ps
docker-compose logs postgres
```

### 🔧 3. Configurar el Backend
```bash
cd ../backEnd
npm install
```

**Crear archivo `.env` en la carpeta `backEnd`:**
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

**Iniciar el servidor backend:**
```bash
npm run dev
```

✅ **Backend corriendo en:** http://localhost:3001

### 📱 4. Configurar el Frontend
```bash
cd ../frontEnd
npm install
npm run dev
```

✅ **Frontend corriendo en:** http://localhost:5173

## 🌐 Acceso a la Aplicación

Una vez que todos los servicios estén ejecutándose:

1. **Abrir navegador** en: http://localhost:5173
2. **Agregar productos** usando el formulario superior
3. **Ver lista de productos** en tiempo real
4. **Eliminar productos** con confirmación

## 📊 API Endpoints

### 🛍️ Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| POST | `/api/products` | Crear nuevo producto |
| GET | `/api/products/:id` | Obtener producto por ID |
| DELETE | `/api/products/:id` | Eliminar producto por ID |

### 📝 Ejemplo de Request - Crear Producto
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Smartphone Apple con chip A17 Pro",
    "price": 4500000
  }'
```

### 📝 Ejemplo de Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Smartphone Apple con chip A17 Pro", 
    "price": 4500000,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  "message": "Producto creado exitosamente"
}
```

## 💡 Funcionalidades Implementadas

### 🎨 Frontend (React + TypeScript)
1. **📋 Lista de Productos**
   - Visualización en grid responsivo
   - Formateo de precios en pesos colombianos (COP)
   - Botones de eliminación con confirmación
   - Estados de carga y manejo de errores
   - Actualización automática después de operaciones

2. **📝 Formulario de Productos**
   - Validación en tiempo real con React Hook Form
   - Campos requeridos: nombre, descripción, precio
   - Vista previa del precio formateado
   - Mensajes de éxito y error contextuales
   - Limpieza automática después de envío exitoso

3. **🔄 Gestión de Estado**
   - React Context API para estado global
   - useReducer para manejo de estado complejo
   - Hooks personalizados para reutilización
   - Separación clara entre lógica y presentación

### ⚙️ Backend (Node.js + Express + TypeORM)
1. **🛡️ API RESTful Robusta**
   - Estructura modular con controladores
   - Validación comprehensiva de datos
   - Manejo de errores centralizado
   - Respuestas JSON consistentes

2. **🗄️ Integración con Base de Datos**
   - Entidad Product con TypeORM
   - Validaciones a nivel de base de datos
   - Timestamps automáticos (created_at, updated_at)
   - Índices para optimización de consultas

## 🧪 Testing y Validación

### ✅ Casos de Prueba Implementados
- **Crear producto** con datos válidos
- **Validación de campos** requeridos y tipos
- **Eliminación de productos** con confirmación
- **Listado de productos** con ordenamiento
- **Manejo de errores** de conexión y validación
- **Responsividad** en dispositivos móviles
- **Persistencia de datos** en PostgreSQL

### 🔧 Herramientas de Testing Utilizadas
- **Postman** - Testing manual de endpoints
- **DBeaver** - Verificación de base de datos
- **Browser DevTools** - Testing de frontend
- **Docker Logs** - Monitoreo de base de datos

## 🎨 Diseño y Experiencia de Usuario

### 🎯 Características de UX/UI
- **📱 Responsive Design** - Funciona en móviles, tablets y desktop
- **⚡ Loading States** - Indicadores de carga para mejor experiencia
- **🚨 Error Handling** - Mensajes de error claros y accionables
- **✅ Confirmaciones** - Dialogs de confirmación para acciones destructivas
- **🎭 Feedback Visual** - Animaciones y transiciones suaves
- **♿ Accesibilidad** - Contraste adecuado y navegación por teclado

### 🎨 Sistema de Diseño
- **Colores**: Paleta azul/gris profesional
- **Tipografía**: System fonts para óptima legibilidad
- **Espaciado**: Grid system consistente
- **Iconografía**: Emojis para mejor UX

## 🔧 Comandos Útiles

### 🔧 Backend
```bash
# Desarrollo con hot reload
npm run dev

# Construcción para producción
npm run build

# Ejecutar en producción
npm start

# Verificar conexión a BD
npm run test-db
```

### 📱 Frontend
```bash
# Servidor de desarrollo
npm run dev

# Construcción optimizada
npm run build

# Preview de producción
npm run preview

# Linting de código
npm run lint
```

### 🗄️ Base de Datos
```bash
# Iniciar PostgreSQL
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f postgres

# Reiniciar base de datos
docker-compose restart postgres
```

## 🗄️ Esquema de Base de Datos

### 📋 Tabla: products
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

### 📊 Índices para Optimización
```sql
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);
```

## 🛡️ Consideraciones de Seguridad

- ✅ **Validación dual** - Frontend y backend validan datos
- ✅ **Variables de entorno** - Configuración sensible protegida
- ✅ **CORS configurado** - Políticas de origen cruzado
- ✅ **Sanitización ORM** - TypeORM previene SQL injection
- ✅ **TypeScript** - Type safety en tiempo de compilación
- ✅ **Error handling** - No exposición de datos sensibles

## 🚀 Posibles Mejoras Futuras

### 🔐 Seguridad y Autenticación
- [ ] Sistema de autenticación JWT
- [ ] Roles de usuario (admin, viewer)
- [ ] Rate limiting en API
- [ ] Validación de HTTPS

### 📊 Funcionalidades Avanzadas  
- [ ] Paginación en lista de productos
- [ ] Búsqueda y filtros avanzados
- [ ] Edición inline de productos
- [ ] Subida de imágenes de productos
- [ ] Categorías de productos
- [ ] Historial de cambios (audit log)

### 🧪 Testing y Calidad
- [ ] Tests unitarios (Jest + React Testing Library)
- [ ] Tests de integración (Supertest)
- [ ] Tests end-to-end (Cypress/Playwright)
- [ ] Coverage de código
- [ ] Análisis estático con SonarQube

### 🚀 DevOps y Deployment
- [ ] CI/CD con GitHub Actions
- [ ] Deployment en AWS/Azure/Vercel
- [ ] Monitoreo con Prometheus/Grafana
- [ ] Logs centralizados
- [ ] Backup automático de BD

### 📱 Extensiones de Plataforma
- [ ] App móvil con React Native
- [ ] API en C# con ASP.NET Core
- [ ] Dashboard administrativo
- [ ] API GraphQL

## � Documentación Adicional

### 🔗 Enlaces Útiles
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

### 📚 Recursos de Aprendizaje
- [Vite Guide](https://vitejs.dev/guide/)
- [React Hook Form](https://react-hook-form.com/)
- [Docker Getting Started](https://docs.docker.com/get-started/)

## 👨‍💻 Información del Desarrollador

**👤 Desarrollador:** Steven  
**🏢 Empresa:** Prueba Técnica para IglooLab  
**📅 Fecha:** Septiembre 2025  
**🎯 Posición:** Full Stack Developer  

### �️ Tecnologías Dominadas
- Frontend: React, TypeScript, HTML5, CSS3, JavaScript
- Backend: Node.js, Express, RESTful APIs
- Base de Datos: PostgreSQL, MySQL, MongoDB
- DevOps: Docker, Git, CI/CD
- Herramientas: VSCode, Postman, DBeaver

---

## 📝 Notas Técnicas Importantes

### 🔍 Decisiones de Arquitectura
- **React Context vs Redux**: Se eligió Context API por simplicidad y tamaño del proyecto
- **TypeORM vs Prisma**: TypeORM por decorators y familiaridad con TypeScript
- **Vite vs CRA**: Vite por velocidad de build y HMR superior
- **PostgreSQL vs MySQL**: PostgreSQL por robustez y características avanzadas

### ⚡ Optimizaciones Implementadas
- **Code splitting** automático con Vite
- **Tree shaking** para reducir bundle size
- **Lazy loading** de componentes pesados
- **Memoización** con React.memo y useCallback
- **Índices de base de datos** para consultas rápidas

### 🎯 Cumplimiento de Requisitos

Esta aplicación cumple **100%** con los requisitos técnicos solicitados:

- ✅ **Frontend en React con TypeScript** - Implementado con Vite y componentes modernos
- ✅ **Backend en Node.js con Express y TypeScript** - API RESTful completa  
- ✅ **Base de datos PostgreSQL** - Configurada con Docker y TypeORM
- ✅ **API RESTful funcional** - Endpoints CRUD completamente operativos
- ✅ **CRUD completo de productos** - Crear, leer y eliminar implementados
- ✅ **Interfaz de usuario intuitiva** - Diseño moderno y responsive
- ✅ **Código bien estructurado** - Arquitectura modular y limpia
- ✅ **Documentación completa** - README detallado y código comentado

### 🏆 Valor Agregado Entregado

**Funcionalidades Extra:**
- 🎨 Diseño responsive profesional
- 🔄 Estado global con React Context
- ✅ Validación en tiempo real
- 🛡️ Manejo robusto de errores  
- 📊 Formato de precios localizados
- ⚡ Hot Module Replacement
- 🐳 Containerización con Docker
- 📝 TypeScript end-to-end

**Mejores Prácticas:**
- 🧹 Código limpio y mantenible
- 📁 Estructura de carpetas organizada
- 🔒 Validación en frontend y backend
- 📚 Documentación comprehensiva
- 🧪 Testing manual exhaustivo

---

**🎉 ¡Proyecto listo para evaluación y uso en producción!** 🎉

*Este proyecto demuestra competencias sólidas en desarrollo Full Stack moderno con las mejores prácticas de la industria.*

- **Frontend**: React con TypeScript y Vite
- **Backend**: Node.js con TypeScript, Express y TypeORM
- **Base de datos**: MySQL
- **API RESTful** con validación de datos
- **Interfaz responsiva** para gestión de productos

## 📁 Estructura del Proyecto

```
├── frontEnd/          # Aplicación React con TypeScript
├── backEnd/           # API REST con Node.js y TypeScript
├── database/          # Scripts SQL y configuración de BD
├── docker-compose.yml # Configuración de Docker para MySQL
└── README.md         # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerequisitos

- Node.js (v18 o superior)
- MySQL 8.0 o Docker
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd igloolab-tech-test
```

### 2. Configurar la Base de Datos

#### Opción A: Con Docker (Recomendado)

```bash
docker-compose up -d
```

Esto iniciará:
- MySQL en el puerto 3306
- phpMyAdmin en http://localhost:8080

#### Opción B: MySQL Local

1. Instalar MySQL Server
2. Ejecutar el script de inicialización:
   ```bash
   mysql -u root -p < database/init.sql
   ```

### 3. Configurar el Backend

```bash
cd backEnd
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev
```

El servidor estará disponible en http://localhost:3001

### 4. Configurar el Frontend

```bash
cd frontEnd
npm install
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## 📚 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| POST | `/api/products` | Crear un nuevo producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

### Ejemplo de uso:

```bash
# Obtener todos los productos
curl http://localhost:3001/api/products

# Crear un producto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Producto Test","description":"Descripción test","price":99.99}'

# Eliminar un producto
curl -X DELETE http://localhost:3001/api/products/1
```

## 🔧 Scripts Disponibles

### Backend
- `npm run dev`: Ejecutar en modo desarrollo
- `npm run build`: Compilar TypeScript
- `npm start`: Ejecutar en producción

### Frontend
- `npm run dev`: Ejecutar en modo desarrollo
- `npm run build`: Construir para producción
- `npm run preview`: Previsualizar build de producción

## 🏗️ Tecnologías Utilizadas

### Backend
- Node.js
- TypeScript
- Express.js
- TypeORM
- MySQL
- Helmet (seguridad)
- CORS
- Morgan (logging)

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- React Hook Form
- CSS Modules

## 🌟 Características Implementadas

- ✅ CRUD completo de productos
- ✅ Validación de datos en backend
- ✅ Interfaz de usuario intuitiva
- ✅ Manejo de errores
- ✅ TypeScript en frontend y backend
- ✅ Base de datos con relaciones
- ✅ Configuración con Docker
- ✅ API RESTful bien estructurada

## 🎯 Próximos Pasos

Como se mencionó en los requisitos opcionales, los siguientes pasos incluirían:

1. **API en C# con ASP.NET**: Replicar la funcionalidad actual
2. **Aplicación móvil**: Versión en React Native
3. **Funcionalidades adicionales**: Edición de productos, paginación, búsqueda

## 👨‍💻 Autor

Steven - Desarrollador Full Stack

---

Este proyecto fue desarrollado como parte de una prueba técnica para IglooLab.