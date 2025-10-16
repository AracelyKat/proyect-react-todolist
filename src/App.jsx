import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './components/pages/TasksPage';
import CategoriesPage from './components/pages/categories/CategoriesPage';
import ShowCategoryPage from './components/pages/categories/showCategory';
import TagsPage from './components/pages/tags/TagsPage';

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

          <Route path="/tareas" element={<TasksPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/categorias/:id" element={<ShowCategoryPage />} />
          <Route path="/etiquetas" element={<TagsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;