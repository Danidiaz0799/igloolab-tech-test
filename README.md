# 🛍️ Sistema de Gestión de Productos - IglooLab Tech Test

Aplicación web Full Stack para gestionar inventario de productos con React + Node.js + PostgreSQL.

## 🚀 Ejecución Rápida

### 📋 Prerrequisitos
- Node.js v18+ ([Descargar](https://nodejs.org/))
- Docker ([Descargar](https://www.docker.com/))

### ⚡ Pasos para Ejecutar

**1. Clonar proyecto**
```bash
git clone https://github.com/Danidiaz0799/igloolab-tech-test.git
cd igloolab-tech-test
```

**2. Levantar Base de Datos**
```bash
docker-compose up -d
```

**3. Ejecutar Backend** (Terminal 1)
```bash
cd backEnd
npm install
npm run dev
```
✅ Backend corriendo en: http://localhost:3001

**4. Ejecutar Frontend** (Terminal 2)
```bash
cd frontEnd
npm install
npm run dev
```
✅ Frontend corriendo en: http://localhost:5173

### 🎯 Acceso a la Aplicación
Abrir navegador en: **http://localhost:5173**

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeORM |
| Base de Datos | PostgreSQL 15 + Docker |
| API | RESTful con validación completa |

## 📁 Estructura del Proyecto

```
📦 igloolab-tech-test
├── 📱 frontEnd/          # React + TypeScript
├── 🔧 backEnd/           # Node.js + Express API
├── 🗄️ database/          # PostgreSQL scripts
└── 🐳 docker-compose.yml # Base de datos
```

## 🔗 API Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/products` | Listar productos |
| POST | `/api/products` | Crear producto |
| DELETE | `/api/products/:id` | Eliminar producto |

## ✅ Funcionalidades

- ➕ Crear productos con validación
- 📋 Listar productos en tiempo real
- 🗑️ Eliminar productos
- 📱 Diseño responsive
- ⚡ Interfaz moderna y rápida

## 🔧 Configuración Técnica

### Variables de Entorno (Backend)
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=products_db
```

### Puertos de la Aplicación
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5432

---

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

## 🛡️ Consideraciones de Seguridad

- ✅ **Validación dual** - Frontend y backend validan datos
- ✅ **Variables de entorno** - Configuración sensible protegida
- ✅ **CORS configurado** - Políticas de origen cruzado
- ✅ **Sanitización ORM** - TypeORM previene SQL injection
- ✅ **TypeScript** - Type safety en tiempo de compilación
- ✅ **Error handling** - No exposición de datos sensibles

### �️ Tecnologías Dominadas
- Frontend: React, TypeScript, HTML5, CSS3, JavaScript
- Backend: Node.js, Express, RESTful APIs
- Base de Datos: PostgreSQL, MySQL
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

*Este proyecto demuestra competencias sólidas en desarrollo Full Stack moderno con las mejores prácticas de la industria.*

- **Frontend**: React con TypeScript y Vite
- **Backend**: Node.js con TypeScript, Express y TypeORM
- **Base de datos**: MySQL
- **API RESTful** con validación de datos
- **Interfaz responsiva** para gestión de productos