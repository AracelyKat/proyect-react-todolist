import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, updateTask } from '../../../services/TaskService';
import { getAll as getCategories } from '../../../services/CategoryService';
import { getAll as getTags } from '../../../services/TagService';

function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    tag_ids: [],
    status: 'incompleto'
  });
  
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataLoading(true);
        setError('');
        
        const [taskResult, categoriesResult, tagsResult] = await Promise.all([
          getById(id),
          getCategories(),
          getTags()
        ]);

        if (taskResult?.data) {
          const task = taskResult.data;
          setFormData({
            title: task.title || '',
            description: task.description || '',
            category_id: task.category_id || '',
            tag_ids: task.tags ? task.tags.map(tag => tag.id) : [],
            status: task.status || 'incompleto'
          });
        } else {
          setError('Tarea no encontrada');
        }

        if (categoriesResult?.data) setCategories(categoriesResult.data);
        if (tagsResult?.data) setTags(tagsResult.data);

      } catch {
        setError('Error al cargar los datos');
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      setLoading(false);
      return;
    }

    if (!formData.category_id) {
      setError('Debes seleccionar una categoría');
      setLoading(false);
      return;
    }

    try {
      const result = await updateTask(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category_id: formData.category_id,
        tags: formData.tag_ids,
        status: formData.status
      });

      if (result?.data) {
        navigate('/tareas');
      } else {
        setError(result?.message || 'Error al actualizar la tarea');
      }
    } catch {
      setError('Error de conexión al actualizar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value);
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          tag_ids: [...prev.tag_ids, tagId]
        };
      } else {
        return {
          ...prev,
          tag_ids: prev.tag_ids.filter(id => id !== tagId)
        };
      }
    });
  };

  const handleCancel = () => {
    navigate('/tareas');
  };

  if (dataLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="alert alert-danger">
        {error}
        <div className="mt-2">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/tareas')}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary mb-4">Editar Tarea</h2>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Formulario de Edición</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">
                  Título *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Ingresa el título de la tarea"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="category_id" className="form-label">
                  Categoría *
                </label>
                <select
                  className="form-select"
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  disabled={loading || categories.length === 0}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <div className="form-text text-warning">
                    No hay categorías disponibles
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="status" className="form-label">
                  Estado
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="incompleto">Incompleta</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Describe la tarea"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Etiquetas</label>
              <div className="border rounded p-3">
                <div className="row">
                  {tags.length === 0 ? (
                    <div className="col-12">
                      <div className="text-muted">No hay etiquetas disponibles</div>
                    </div>
                  ) : (
                    tags.map(tag => (
                      <div key={tag.id} className="col-md-4 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`tag-${tag.id}`}
                            value={tag.id}
                            checked={formData.tag_ids.includes(tag.id)}
                            onChange={handleTagChange}
                            disabled={loading}
                          />
                          <label 
                            className="form-check-label" 
                            htmlFor={`tag-${tag.id}`}
                          >
                            {tag.name}
                          </label>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="form-text">
                Selecciona una o más etiquetas para la tarea
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || categories.length === 0}
              >
                {loading ? 'Actualizando...' : 'Actualizar Tarea'}
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTaskPage;