# 📱 Frontend - Sistema de Gestión de Productos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript  
- **Vite** - Build tool moderno y rápido
- **Axios** - Cliente HTTP para comunicación con API
- **React Hook Form** - Gestión eficiente de formularios
- **CSS3** - Estilos personalizados con diseño responsivo

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProductForm.tsx  # Formulario para crear productos
│   ├── ProductForm.css  # Estilos del formulario
│   ├── ProductsList.tsx # Lista de productos
│   └── ProductsList.css # Estilos de la lista
├── context/             # Gestión de estado global
│   ├── productContext.ts # Context y reducer de productos
│   ├── ProductProvider.tsx # Provider component (React)
│   └── productActions.ts # Tipos de acciones del reducer
├── hooks/               # Hooks personalizados
│   └── useProducts.ts   # Hook para acceder al contexto
├── services/            # Servicios de API
│   └── productService.ts # Cliente Axios para API calls
├── types/               # Definiciones TypeScript
│   └── product.ts       # Interfaces de productos
├── App.tsx              # Componente principal
├── App.css              # Estilos globales
├── main.tsx             # Punto de entrada
└── index.css            # Reset CSS y estilos base
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js v18+
- npm v8+

### Comandos
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Construcción para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## ⚙️ Configuración

### Variables de Entorno
El frontend se conecta automáticamente al backend en `http://localhost:3001`

### Scripts Disponibles
- `dev` - Servidor de desarrollo con HMR
- `build` - Construcción optimizada para producción
- `preview` - Preview de la build de producción
- `lint` - Análisis de código con ESLint

## 🏗️ Arquitectura

### Gestión de Estado
- **React Context** + **useReducer** para estado global
- **Hook personalizado** `useProducts` para encapsular lógica
- **Acciones tipadas** para manipulación del estado

### Componentes Principales

#### ProductForm.tsx
- Formulario con validación en tiempo real
- React Hook Form para manejo eficiente
- Validaciones: campos requeridos, longitud, tipos
- Preview de precio formateado

#### ProductsList.tsx  
- Lista de productos en grid responsivo
- Estados de loading y error
- Confirmación antes de eliminar
- Formateo de precios y fechas

### Servicios

#### productService.ts
- Cliente Axios configurado
- Métodos: getAllProducts, createProduct, deleteProduct
- Manejo de errores HTTP
- Tipos TypeScript para requests/responses

## 🎨 Estilos

### Características de Diseño
- **Responsive Design** - Mobile-first approach
- **CSS Grid** y **Flexbox** para layouts
- **Animaciones** suaves con CSS transitions
- **Loading states** con spinners
- **Paleta de colores** profesional azul/gris

### Componentes Estilizados
- Formulario con validación visual
- Cards de productos con hover effects
- Botones con estados (loading, disabled)
- Mensajes de éxito/error

## 🔧 Configuración de Desarrollo

### TypeScript
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Vite Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-refresh/recommended"
  ]
}
```

## 📊 Dependencias

### Producción
```json
{
  "axios": "^1.11.0",
  "react": "^19.1.1", 
  "react-dom": "^19.1.1",
  "react-hook-form": "^7.62.0"
}
```

### Desarrollo
```json
{
  "@types/react": "^19.1.12",
  "@types/react-dom": "^19.1.9",
  "@vitejs/plugin-react": "^5.0.0",
  "eslint": "^9.33.0",
  "typescript": "~5.8.3",
  "vite": "^7.1.2"
}
```

## 🚀 Deploy

### Build para Producción
```bash
npm run build
```

La carpeta `dist/` contiene los archivos optimizados para producción.

### Opciones de Deployment
- **Vercel** - `vercel deploy`
- **Netlify** - `netlify deploy --prod`
- **GitHub Pages** - `npm run build && gh-pages -d dist`

## 🧪 Testing

### Testing Manual
- ✅ Crear productos con datos válidos
- ✅ Validación de formularios
- ✅ Eliminación con confirmación
- ✅ Responsividad en móviles
- ✅ Estados de loading y error

### Próximos Tests Automatizados
- [ ] Tests unitarios con Jest
- [ ] Tests de componentes con React Testing Library
- [ ] Tests E2E con Cypress

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de CORS
**Solución:** Verificar que el backend esté ejecutándose en `http://localhost:3001`

#### Fast Refresh Warning
**Solución:** Separar Context y componentes en archivos diferentes (ya implementado)

#### Build Fails
**Solución:** Verificar tipos TypeScript y ejecutar `npm run lint`

### Logs de Desarrollo
- Abrir DevTools (F12)
- Verificar Console para errores
- Network tab para requests HTTP
- React DevTools para estado de componentes

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios Documentation](https://axios-http.com/docs/intro)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
