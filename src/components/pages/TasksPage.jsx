import { useEffect } from 'react';
import { getAll } from '../../services/TaskService';

function TasksPage() {
  useEffect(() => {
    getAll().then(data => {
      console.log("Lista de tareas:", data);
    });
  }, []);

  return null;
}

export default TasksPage;
