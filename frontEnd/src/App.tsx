import { ProductProvider } from './context/ProductProvider';
import ProductForm from './components/ProductForm';
import ProductsList from './components/ProductsList';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <div className="app">
        <header className="app-header">
          <h1>🛍️ Gestión de Productos</h1>
          <p>Sistema de administración de productos - Prueba Técnica IglooLab</p>
        </header>
        
        <main className="app-main">
          <section className="form-section">
            <ProductForm />
          </section>
          
          <section className="list-section">
            <ProductsList />
          </section>
        </main>
        
        <footer className="app-footer">
          <p>Desarrollado con React + TypeScript + Node.js + PostgreSQL</p>
        </footer>
      </div>
    </ProductProvider>
  );
}

export default App;
