import apiFetch from './apiFetch';

const TASK_ROUTE = 'tasks';

export const getAll = () => apiFetch(TASK_ROUTE);

export const getById = (id) => apiFetch(`${TASK_ROUTE}/${id}`);

export const createTask = (taskData) => apiFetch(TASK_ROUTE, {
  method: 'POST',
  body: taskData,
});

export const updateTask = (id, taskData) => apiFetch(`${TASK_ROUTE}/${id}`, {
  method: 'PUT',
  body: taskData,
});

export const deleteTask = (id) => apiFetch(`${TASK_ROUTE}/${id}`, {
  method: 'DELETE',
});

export default { getAll, getById, createTask, updateTask, deleteTask };