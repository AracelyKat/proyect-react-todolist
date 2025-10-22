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
import HomePage from './components/pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';

function App() {
  localStorage.clear();
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tareas" element={<TasksPage />} />
                  <Route path="/categorias" element={<CategoriesPage />} />
                  <Route path="/categorias/:id" element={<ShowCategoryPage />} />
                  <Route path="/etiquetas" element={<TagsPage />} />
                  <Route path="/etiquetas/:id" element={<ShowTagPage />} />
                  <Route path="/tareas/crear" element={<CreateTaskPage />} />
                  <Route path="/tareas/editar/:id" element={<EditTaskPage />} />
                  <Route path="/tareas/:id" element={<ShowTask />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;