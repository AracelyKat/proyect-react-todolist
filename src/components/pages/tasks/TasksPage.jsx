import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteTask } from '../../../services/TaskService';

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getAll();
      
      if (result?.data) {
        setTasks(result.data);
      } else {
        setTasks([]);
      }
    } catch {
      setError('Error al cargar las tareas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    navigate('/tareas/crear');
  };

  const handleDelete = async (taskId, taskTitle) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${taskTitle}"?`)) {
      return;
    }

    try {
      setDeleteLoading(taskId);
      await deleteTask(taskId);
      
      await fetchTasks();
      
    } catch {
      setError('Error al eliminar la tarea');
    } finally {
      setDeleteLoading(null);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Gestión de Tareas</h2>
        <button 
          className="btn btn-success"
          onClick={handleCreate}
        >
          Crear Tarea
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Etiquetas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No hay tareas registradas
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>
                  {task.category ? (
                    <span className="badge bg-primary">{task.category.name}</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {task.tags && task.tags.length > 0 ? (
                    <div className="d-flex flex-wrap gap-1">
                      {task.tags.map(tag => (
                        <span key={tag.id} className="badge bg-secondary">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <span className={`badge ${task.status === 'completada' ? 'bg-success' : 'bg-warning'}`}>
                    {task.status === 'completada' ? 'Completada' : 'Incompleta'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button 
                      className="btn btn-sm btn-outline-info"
                      onClick={() => navigate(`/tareas/${task.id}`)}
                      title="Ver detalles"
                    >
                      <i className="bi bi-eye"></i> Ver
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/tareas/editar/${task.id}`)}
                      title="Editar tarea"
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(task.id, task.title)}
                      disabled={deleteLoading === task.id}
                      title="Eliminar tarea"
                    >
                      {deleteLoading === task.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          Eliminando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-trash"></i> Eliminar
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TasksPage;