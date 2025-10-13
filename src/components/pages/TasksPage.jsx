import { useEffect, useState } from 'react';
import { getAll } from '../../services/TaskService';

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getAll();
        console.log("Lista de tareas:", result.data);
        setTasks(result.data || []);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Gestión de Tareas</h2>
        <button className="btn btn-primary">Nueva Tarea</button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Etiquetas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">No hay tareas registradas</td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description || '—'}</td>
                <td>{task.category?.name || 'Sin categoría'}</td>
                <td>
                  {task.tags?.length > 0
                    ? task.tags.map(tag => (
                        <span key={tag.id} className="badge bg-secondary me-1">
                          {tag.name}
                        </span>
                      ))
                    : '—'}
                </td>
                <td>{task.status === 'completada' ? 'Completada' : 'Incompleta'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TasksPage;
