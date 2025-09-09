import type { Product } from './types';

export const SHARED_DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Laptop Gaming Asus ROG',
        description: 'Laptop para gaming con procesador Intel i7, 16GB RAM, RTX 4060, pantalla 144Hz',
        price: 3200000,
        created_at: new Date('2025-09-01T10:00:00Z').toISOString(),
        updated_at: new Date('2025-09-01T10:00:00Z').toISOString()
    },
    {
        id: 2,
        name: 'Monitor 4K Samsung 27"',
        description: 'Monitor profesional 4K UHD de 27 pulgadas con tecnología QLED y HDR10',
        price: 850000,
        created_at: new Date('2025-09-02T11:30:00Z').toISOString(),
        updated_at: new Date('2025-09-02T11:30:00Z').toISOString()
    },
    {
        id: 3,
        name: 'Teclado Mecánico Corsair',
        description: 'Teclado mecánico gaming con switches Cherry MX y retroiluminación RGB',
        price: 320000,
        created_at: new Date('2025-09-03T14:15:00Z').toISOString(),
        updated_at: new Date('2025-09-03T14:15:00Z').toISOString()
    },
    {
        id: 4,
        name: 'Mouse Gaming Logitech G502',
        description: 'Mouse gaming con sensor HERO 25K, 11 botones programables y peso ajustable',
        price: 180000,
        created_at: new Date('2025-09-04T09:20:00Z').toISOString(),
        updated_at: new Date('2025-09-04T09:20:00Z').toISOString()
    },
    {
        id: 5,
        name: 'Auriculares Sony WH-1000XM5',
        description: 'Auriculares inalámbricos con cancelación de ruido activa y 30h de batería',
        price: 950000,
        created_at: new Date('2025-09-05T16:45:00Z').toISOString(),
        updated_at: new Date('2025-09-05T16:45:00Z').toISOString()
    },
    {
        id: 6,
        name: 'SSD NVMe Samsung 1TB',
        description: 'Disco sólido NVMe PCIe 4.0 de 1TB con velocidades hasta 7,000 MB/s',
        price: 450000,
        created_at: new Date('2025-09-06T12:10:00Z').toISOString(),
        updated_at: new Date('2025-09-06T12:10:00Z').toISOString()
    },
    {
        id: 7,
        name: 'Webcam Logitech C920 HD',
        description: 'Cámara web Full HD 1080p con micrófono estéreo integrado',
        price: 280000,
        created_at: new Date('2025-09-07T08:30:00Z').toISOString(),
        updated_at: new Date('2025-09-07T08:30:00Z').toISOString()
    },
    {
        id: 8,
        name: 'Smartphone Samsung Galaxy S24',
        description: 'Teléfono inteligente con cámara de 50MP, 8GB RAM y pantalla Dynamic AMOLED',
        price: 2800000,
        created_at: new Date('2025-09-08T13:25:00Z').toISOString(),
        updated_at: new Date('2025-09-08T13:25:00Z').toISOString()
    }
    ];

export const STORAGE_KEY = 'products_dummy_data';
