import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import productRoutes from './routes/productRoutes';
import { validateJSON, requestLogger, errorHandler } from './middleware/validation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5173',
        'http://localhost:8081',
        'http://localhost:8081',
        'exp://localhost:8081',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(validateJSON);

app.use('/api', productRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API de Gestión de Productos',
        version: '1.0.0',
        description: 'API RESTful para gestionar productos con PostgreSQL',
        endpoints: {
        health: {
            url: '/health',
            method: 'GET',
            description: 'Verificar estado del servidor'
        },
        products: {
            getAll: {
            url: 'GET /api/products',
            description: 'Obtener todos los productos'
            },
            getById: {
            url: 'GET /api/products/:id',
            description: 'Obtener un producto específico por ID'
            },
            create: {
            url: 'POST /api/products',
            description: 'Crear un nuevo producto',
            body: {
                name: 'string (requerido, max 255 caracteres)',
                description: 'string (requerido)',
                price: 'number (requerido, positivo)'
            }
            },
            delete: {
            url: 'DELETE /api/products/:id',
            description: 'Eliminar un producto por ID'
            }
        }
        },
        database: {
        type: 'PostgreSQL',
        status: 'connected'
        },
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos PostgreSQL establecida');

        app.listen(Number(PORT), '0.0.0.0', () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`🌐 Servidor accesible desde la red en http://192.168.20.46:${PORT}`);
        console.log(`📚 Documentación de la API disponible en http://localhost:${PORT}`);
        console.log(`🗄️  Base de datos PostgreSQL configurada y conectada`);
        });
    } catch (error) {
        console.error('❌ Error al inicializar el servidor:', error);
        console.error('💡 Asegúrate de que PostgreSQL esté ejecutándose y la base de datos esté creada');
        process.exit(1);
    }
};

startServer();
