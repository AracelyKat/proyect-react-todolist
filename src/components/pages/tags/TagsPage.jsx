import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteTag } from '../../../services/TagService';
import CreateTag from './CreateTag';
import EditTag from './EditTag';

function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate(); 

  const fetchTags = async () => {
    try {
      setLoading(true);
      const result = await getAll();
      if (result?.data) {
        setTags(result.data);
      } else {
        setTags([]);
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
        fetchTags();
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
    fetchTags();
  };

  const handleView = (id) => {
    navigate(`/etiquetas/${id}`);
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

      <CreateTag onCreated={fetchTags} />

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
                <td>{index + 1}</td>
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
    </div>
  );
}

export default TagsPage;