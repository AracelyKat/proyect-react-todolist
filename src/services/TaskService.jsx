import { API_URL, TOKEN } from './constants';

export const getAll = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
  });
  return await response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });
  return await response.json();
};

export const getById = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
  });
  return await response.json();
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });
  return await response.json();
};