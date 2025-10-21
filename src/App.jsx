import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './components/pages/tasks/TasksPage';
import CategoriesPage from './components/pages/categories/CategoriesPage';
import ShowCategoryPage from './components/pages/categories/showCategory';
import TagsPage from './components/pages/tags/TagsPage';
import ShowTagPage from './components/pages/tags/ShowTagPage';
import CreateTaskPage from './components/pages/tasks/CreateTaskPage';
import EditTaskPage from "./components/pages/tasks/EditTaskPage";
import ShowTask from "./components/pages/tasks/ShowTask";
import Login from './components/Login';
import { AuthService } from './services/AuthService';
import './App.css';

function App() {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <Router>
      <Routes>
        {/* Ruta de login - solo accesible si NO está autenticado */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        
        {/* Rutas protegidas - solo accesibles si ESTÁ autenticado */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
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
                  <Route path="/etiquetas/:id" element={<ShowTagPage />} />
                  <Route path="/tareas/crear" element={<CreateTaskPage />} />
                  <Route path="/tareas/editar/:id" element={<EditTaskPage />} />
                  <Route path="/tareas/:id" element={<ShowTask />} />
                  
                  {/* Ruta por defecto para rutas no encontradas */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;