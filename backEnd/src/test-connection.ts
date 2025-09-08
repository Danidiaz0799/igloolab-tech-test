import { AppDataSource } from './config/database';
import { Product } from './entities/Product';

const testConnection = async () => {
  try {
    console.log('🔍 Iniciando prueba de conexión a PostgreSQL...');
    
    // Intentar conectar
    await AppDataSource.initialize();
    console.log('✅ ¡Conexión exitosa a PostgreSQL!');
    
    // Probar el repositorio
    const productRepository = AppDataSource.getRepository(Product);
    console.log('✅ Repositorio de Product configurado correctamente');
    
    // Verificar que las tablas se hayan creado
    const count = await productRepository.count();
    console.log(`📊 Productos en la base de datos: ${count}`);
    
    // Cerrar conexión
    await AppDataSource.destroy();
    console.log('🔐 Conexión cerrada correctamente');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    console.log('\n💡 Posibles soluciones:');
    console.log('   1. Verificar que PostgreSQL esté ejecutándose');
    console.log('   2. Comprobar las credenciales en el archivo .env');
    console.log('   3. Asegurarse de que la base de datos "products_db" existe');
    console.log('   4. Verificar que el puerto 5432 esté disponible');
  }
};

testConnection();
