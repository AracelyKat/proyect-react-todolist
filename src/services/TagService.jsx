import { API_URL, TOKEN } from './constants';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error en getAll() de etiquetas:", error);
    return [];
  }
};

export const createTag = async (name) => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ name }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al crear etiqueta:", error);
    return null;
  }
};

export const updateTag = async (id, name) => {
  try {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ name }),
    });

    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar etiqueta ${id}:`, error);
    return null;
  }
};