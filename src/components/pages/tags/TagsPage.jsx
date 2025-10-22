import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteTag } from '../../../services/TagService';
import CreateTag from './CreateTag';
import EditTag from './EditTag';

function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  });
  const navigate = useNavigate(); 

  const fetchTags = async (page = 1) => {
    try {
      setLoading(true);
      const result = await getAll(page);
      if (result?.data) {
        if (result.data.data) {
          setTags(result.data.data);
          setPagination({
            current_page: result.data.current_page,
            last_page: result.data.last_page,
            per_page: result.data.per_page,
            total: result.data.total
          });
        } else {
          setTags(result.data);
          setPagination({
            current_page: 1,
            last_page: 1,
            per_page: result.data.length,
            total: result.data.length
          });
        }
      } else {
        setTags([]);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0
        });
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la etiqueta "${name}"?`)) {
      const result = await deleteTag(id);
      if (result?.message) {
        fetchTags(pagination.current_page);
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
    fetchTags(pagination.current_page);
  };

  const handleView = (id) => {
    navigate(`/etiquetas/${id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchTags(newPage);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary mb-4">Gestión de Etiquetas</h2>

      <CreateTag onCreated={() => fetchTags(pagination.current_page)} />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tags.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No hay etiquetas registradas
              </td>
            </tr>
          ) : (
            tags.map((tag, index) => (
              <tr key={tag.id}>
                <td>{(pagination.current_page - 1) * pagination.per_page + index + 1}</td>
                <td>
                  {editingId === tag.id ? (
                    <EditTag 
                      tag={tag}
                      onUpdated={handleUpdated}
                      onCancel={cancelEditing}
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td>
                  {editingId === tag.id ? (
                    <span className="text-muted">Editando...</span>
                  ) : (
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-info"
                        onClick={() => handleView(tag.id)}
                      >
                        Ver
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => startEditing(tag.id)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(tag.id, tag.name)}
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
        <nav aria-label="Paginación de etiquetas">
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

      {tags.length > 0 && (
        <div className="mt-3 text-center">
          <small className="text-muted">
            Mostrando {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} de {pagination.total} etiquetas
          </small>
        </div>
      )}
    </div>
  );
}

export default TagsPage;