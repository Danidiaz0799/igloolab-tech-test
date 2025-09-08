import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// GET /products - Obtener todos los productos
router.get('/products', (req, res) => productController.getAllProducts(req, res));

// GET /products/:id - Obtener un producto específico por ID
router.get('/products/:id', (req, res) => productController.getProductById(req, res));

// POST /products - Crear un nuevo producto
router.post('/products', (req, res) => productController.createProduct(req, res));

// DELETE /products/:id - Eliminar un producto por ID
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
