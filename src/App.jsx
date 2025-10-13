import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './components/pages/TasksPage'; // <-- importamos el TasksPage

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-5">
              <div className="jumbotron bg-light p-5 rounded">
                <h1 className="display-4 text-primary">Hello World!</h1>
                <p className="lead">Bienvenido a tu aplicación TO DO LIST</p>
                <hr className="my-4" />
                <p>Comienza gestionando tus tareas desde el menú lateral.</p>
                <div className="mt-4">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Tareas</h5>
                          <p className="card-text">Gestiona tus tareas pendientes</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Categorías</h5>
                          <p className="card-text">Organiza por categorías</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Etiquetas</h5>
                          <p className="card-text">Etiqueta tus tareas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Aquí reemplazamos el contenido hardcodeado por el componente TasksPage */}
          <Route path="/tareas" element={<TasksPage />} />

          <Route path="/categorias" element={
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Gestión de Categorías</h2>
                <button className="btn btn-primary">Nueva Categoría</button>
              </div>
              <div className="alert alert-info">
                Aquí podrás gestionar las categorías de tus tareas. Funcionalidad en desarrollo.
              </div>
            </div>
          } />

          <Route path="/etiquetas" element={
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Gestión de Etiquetas</h2>
                <button className="btn btn-primary">Nueva Etiqueta</button>
              </div>
              <div className="alert alert-info">
                Aquí podrás gestionar las etiquetas de tus tareas. Funcionalidad en desarrollo.
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
