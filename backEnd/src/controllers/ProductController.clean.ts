import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productRepository.find({
        order: {
          created_at: 'DESC'
        }
      });
      
      res.status(200).json({
        success: true,
        data: products,
        count: products.length,
        message: 'Productos obtenidos exitosamente'
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price } = req.body;

      if (!name || !description || price === undefined || price === null) {
        res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios (name, description, price)',
          required_fields: ['name', 'description', 'price']
        });
        return;
      }

      if (typeof name !== 'string' || typeof description !== 'string') {
        res.status(400).json({
          success: false,
          message: 'El nombre y la descripción deben ser cadenas de texto'
        });
        return;
      }

      if (name.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'El nombre del producto no puede estar vacío'
        });
        return;
      }

      if (name.trim().length > 100) {
        res.status(400).json({
          success: false,
          message: 'El nombre del producto no puede exceder 100 caracteres'
        });
        return;
      }

      if (description.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'La descripción del producto no puede estar vacía'
        });
        return;
      }

      if (description.trim().length > 500) {
        res.status(400).json({
          success: false,
          message: 'La descripción del producto no puede exceder 500 caracteres'
        });
        return;
      }

      const numericPrice = parseFloat(price.toString());
      if (isNaN(numericPrice) || numericPrice < 0) {
        res.status(400).json({
          success: false,
          message: 'El precio debe ser un número válido mayor o igual a 0'
        });
        return;
      }

      if (numericPrice > 999999999.99) {
        res.status(400).json({
          success: false,
          message: 'El precio no puede exceder 999,999,999.99'
        });
        return;
      }

      const product = new Product();
      product.name = name.trim();
      product.description = description.trim();
      product.price = numericPrice;

      const savedProduct = await this.productRepository.save(product);

      res.status(201).json({
        success: true,
        data: savedProduct,
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const productId = parseInt(id, 10);
      if (isNaN(productId) || productId <= 0) {
        res.status(400).json({
          success: false,
          message: 'ID de producto inválido. Debe ser un número entero positivo'
        });
        return;
      }

      const product = await this.productRepository.findOne({
        where: { id: productId }
      });

      if (!product) {
        res.status(404).json({
          success: false,
          message: `Producto con ID ${productId} no encontrado`
        });
        return;
      }

      await this.productRepository.remove(product);

      res.status(200).json({
        success: true,
        message: `Producto "${product.name}" eliminado exitosamente`,
        data: {
          id: productId,
          name: product.name
        }
      });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const productId = parseInt(id, 10);
      if (isNaN(productId) || productId <= 0) {
        res.status(400).json({
          success: false,
          message: 'ID de producto inválido. Debe ser un número entero positivo'
        });
        return;
      }

      const product = await this.productRepository.findOne({
        where: { id: productId }
      });

      if (!product) {
        res.status(404).json({
          success: false,
          message: `Producto con ID ${productId} no encontrado`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
        message: 'Producto obtenido exitosamente'
      });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  }
}
