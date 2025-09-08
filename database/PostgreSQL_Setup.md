# Configuración de PostgreSQL para el Proyecto

## Opción 1: Instalación Manual de PostgreSQL

### 1. Instalar PostgreSQL
- Descargar desde: https://www.postgresql.org/download/windows/
- Durante la instalación, recordar la contraseña del usuario `postgres`
- El puerto por defecto es `5432`

### 2. Crear la base de datos
```sql
-- Conectar como postgres
psql -U postgres

-- Crear la base de datos
CREATE DATABASE products_db;

-- Conectar a la nueva base de datos
\c products_db;

-- Ejecutar el script de inicialización
\i C:/Users/Steven/Documents/Proyectos/igloolab-tech-test/database/init.sql;
```

### 3. Configurar variables de entorno
En el archivo `.env` del backend, ajustar:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_aquí
DB_NAME=products_db
```

## Opción 2: Con Docker (si tienes Docker instalado)

```bash
docker-compose up -d
```

## Verificar la conexión

Una vez configurado PostgreSQL, ejecutar el backend:
```bash
cd backEnd
npm run dev
```

Si ves el mensaje "✅ Conexión a la base de datos PostgreSQL establecida", todo está funcionando correctamente.

## Herramientas de administración

- **pgAdmin**: Interfaz gráfica para PostgreSQL
- **psql**: Cliente de línea de comandos
- **VS Code Extensions**: PostgreSQL extension pack

## Troubleshooting

### Error de conexión
- Verificar que PostgreSQL esté ejecutándose
- Comprobar credenciales en el archivo `.env`
- Verificar que la base de datos `products_db` exista

### Puerto ocupado
- Cambiar el puerto en `.env` si 5432 está ocupado
- Verificar con: `netstat -an | findstr 5432`
