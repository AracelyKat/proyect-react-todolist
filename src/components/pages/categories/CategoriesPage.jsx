import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteCategory } from '../../../services/CategoryService';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const result = await getAll().catch(() => null);
    if (result?.data) {
      setCategories(result.data);
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${name}"?`)) {
      const result = await deleteCategory(id);
      if (result?.message) {
        fetchCategories();
      }
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleUpdated = () => {
    setEditingId(null);
    fetchCategories();
  };

  const handleView = (id) => {
    navigate(`/categorias/${id}`);
  };

  return (
    <div>
      <h2 className="text-primary mb-4">Gestión de Categorías</h2>

      <CreateCategory onCreated={fetchCategories} />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">No hay categorías registradas</td>
            </tr>
          ) : (
            categories.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>
                  {editingId === cat.id ? (
                    <EditCategory 
                      category={cat}
                      onUpdated={handleUpdated}
                      onCancel={cancelEditing}
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td>
                  {editingId === cat.id ? (
                    <span className="text-muted">Editando...</span>
                  ) : (
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-info"
                        onClick={() => handleView(cat.id)}
                      >
                        Ver
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => startEditing(cat.id)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(cat.id, cat.name)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesPage;