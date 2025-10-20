import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../../services/TaskService';

function ShowTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTaskDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        const result = await getById(id);

        if (result?.data) {
          setTask(result.data);
        } else {
          setError('Tarea no encontrada');
        }
      } catch {
        setError('Error al cargar los detalles de la tarea');
      } finally {
        setLoading(false);
      }
    };

    loadTaskDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/tareas/editar/${id}`);
  };

  const handleBack = () => {
    navigate('/tareas');
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

  if (error && !task) {
    return (
      <div className="alert alert-danger">
        {error}
        <div className="mt-2">
          <button 
            className="btn btn-secondary" 
            onClick={handleBack}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="alert alert-warning">
        Tarea no encontrada
        <div className="mt-2">
          <button 
            className="btn btn-secondary" 
            onClick={handleBack}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Detalles de la Tarea</h2>
        <button 
          className="btn btn-outline-secondary"
          onClick={handleBack}
        >
          ← Volver
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">{task.title}</h4>
            <span className={`badge ${task.status === 'completada' ? 'bg-success' : 'bg-warning'}`}>
              {task.status === 'completada' ? 'Completada' : 'Incompleta'}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Descripción:</strong>
              <p className="mt-1">{task.description || 'Sin descripción'}</p>
            </div>
            
            <div className="col-md-6">
              <strong>Categoría:</strong>
              <div className="mt-1">
                {task.category ? (
                  <span className="badge bg-primary">{task.category.name}</span>
                ) : (
                  <span className="text-muted">Sin categoría</span>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Estado:</strong>
              <div className="mt-1">
                <span className={`badge ${task.status === 'completada' ? 'bg-success' : 'bg-warning'}`}>
                  {task.status === 'completada' ? 'Completada' : 'Incompleta'}
                </span>
              </div>
            </div>
            
            <div className="col-md-6">
              <strong>Fecha de creación:</strong>
              <div className="mt-1">
                {new Date(task.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <strong>Etiquetas:</strong>
            <div className="mt-2">
              {task.tags && task.tags.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {task.tags.map(tag => (
                    <span key={tag.id} className="badge bg-secondary">
                      {tag.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted">Sin etiquetas</span>
              )}
            </div>
          </div>

          {task.updated_at !== task.created_at && (
            <div className="mb-3">
              <strong>Última actualización:</strong>
              <div className="mt-1">
                {new Date(task.updated_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          )}
        </div>

        <div className="card-footer">
          <div className="d-flex gap-2 justify-content-end">
            <button 
              className="btn btn-primary"
              onClick={handleEdit}
            >
              Editar Tarea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTask;