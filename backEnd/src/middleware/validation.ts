import { Request, Response, NextFunction } from 'express';

// Middleware para validar el formato JSON
export const validateJSON = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type debe ser application/json'
      });
    }
  }
  next();
};

// Middleware para logging de requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log al inicio del request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  
  // Interceptar la respuesta para loggear el tiempo de respuesta
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, data);
  };
  
  next();
};

// Middleware para manejo de errores de validación
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error capturado por middleware:', err);
  
  // Error de sintaxis JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el cuerpo de la petición'
    });
  }
  
  // Error de payload muy grande
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'El cuerpo de la petición es demasiado grande'
    });
  }
  
  // Error genérico
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
};
