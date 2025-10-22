import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, deleteTask, updateTask } from '../../../services/TaskService';

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  });

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      const result = await getAll(page);
      
      if (result?.data) {
        if (result.data.data) {
          setTasks(result.data.data);
          setPagination({
            current_page: result.data.current_page,
            last_page: result.data.last_page,
            per_page: result.data.per_page,
            total: result.data.total
          });
        } else {
          setTasks(result.data);
          setPagination({
            current_page: 1,
            last_page: 1,
            per_page: result.data.length,
            total: result.data.length
          });
        }
      } else {
        setTasks([]);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0
        });
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
      await fetchTasks(pagination.current_page);
    } catch {
      setError('Error al eliminar la tarea');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    try {
      setUpdateLoading(taskId);
      
      const newStatus = currentStatus === 'completada' ? 'incompleto' : 'completada';
      
      await updateTask(taskId, {
        status: newStatus
      });

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: newStatus }
            : task
        )
      );
      
    } catch {
      setError('Error al actualizar el estado de la tarea');
      await fetchTasks(pagination.current_page);
    } finally {
      setUpdateLoading(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchTasks(newPage);
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
            <th width="50">#</th>
            <th width="80">Completada</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Etiquetas</th>
            <th width="200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No hay tareas registradas
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id} className={task.status === 'completada' ? 'table-success' : ''}>
                <td>{(pagination.current_page - 1) * pagination.per_page + index + 1}</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.status === 'completada'}
                      onChange={() => handleStatusChange(task.id, task.status)}
                      disabled={updateLoading === task.id}
                      id={`status-${task.id}`}
                    />
                    <label 
                      className="form-check-label visually-hidden" 
                      htmlFor={`status-${task.id}`}
                    >
                      {task.status === 'completada' ? 'Completada' : 'Pendiente'}
                    </label>
                    {updateLoading === task.id && (
                      <div className="spinner-border spinner-border-sm ms-1" role="status">
                        <span className="visually-hidden">Actualizando...</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className={`${task.status === 'completada' ? 'text-decoration-line-through text-muted' : ''}`}>
                    {task.title}
                  </div>
                </td>
                <td>
                  <div className={`${task.status === 'completada' ? 'text-decoration-line-through text-muted' : ''}`}>
                    {task.description || '-'}
                  </div>
                </td>
                <td>
                  <span className={`badge ${task.status === 'completada' ? 'bg-success' : 'bg-warning'}`}>
                    {task.status === 'completada' ? 'Completada' : 'Pendiente'}
                  </span>
                </td>
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
                  <div className="d-flex gap-1">
                    <button 
                      className="btn btn-sm btn-outline-info"
                      onClick={() => navigate(`/tareas/${task.id}`)}
                      title="Ver detalles"
                    >
                      Ver
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/tareas/editar/${task.id}`)}
                      title="Editar tarea"
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(task.id, task.title)}
                      disabled={deleteLoading === task.id}
                      title="Eliminar tarea"
                    >
                      {deleteLoading === task.id ? (
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                      ) : (
                        'Eliminar'
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination.last_page > 1 && (
        <nav aria-label="Paginación de tareas">
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

      {tasks.length > 0 && (
        <div className="mt-3 text-center">
          <small className="text-muted">
            Mostrando {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} de {pagination.total} tareas | 
            Completadas: {tasks.filter(t => t.status === 'completada').length} | 
            Pendientes: {tasks.filter(t => t.status === 'incompleto').length}
          </small>
        </div>
      )}
    </div>
  );
}

export default TasksPage;