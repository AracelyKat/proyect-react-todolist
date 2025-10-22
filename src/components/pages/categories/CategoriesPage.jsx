import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteCategory } from '../../../services/CategoryService';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  });
  const navigate = useNavigate();

  const fetchCategories = async (page = 1) => {
    const result = await getAll(page).catch(() => null);
    if (result?.data) {
      if (result.data.data) {
        setCategories(result.data.data);
        setPagination({
          current_page: result.data.current_page,
          last_page: result.data.last_page,
          per_page: result.data.per_page,
          total: result.data.total
        });
      } else {
        setCategories(result.data);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: result.data.length,
          total: result.data.length
        });
      }
    } else {
      setCategories([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${name}"?`)) {
      const result = await deleteCategory(id);
      if (result?.message) {
        fetchCategories(pagination.current_page);
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
    fetchCategories(pagination.current_page);
  };

  const handleView = (id) => {
    navigate(`/categorias/${id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchCategories(newPage);
    }
  };

  return (
    <div>
      <h2 className="text-primary mb-4">Gestión de Categorías</h2>

      <CreateCategory onCreated={() => fetchCategories(pagination.current_page)} />

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
                <td>{(pagination.current_page - 1) * pagination.per_page + index + 1}</td>
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

      {pagination.last_page > 1 && (
        <nav aria-label="Paginación de categorías">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Anterior
              </button>
            </li>
            
            {[...Array(pagination.last_page)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <li key={pageNumber} className={`page-item ${pagination.current_page === pageNumber ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
            
            <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}

      {categories.length > 0 && (
        <div className="mt-3 text-center">
          <small className="text-muted">
            Mostrando {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} de {pagination.total} categorías
          </small>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;