import { API_URL, TOKEN } from './constants';
export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error en getAll() de categorías:", error);
    return [];
  }
};

export const createCategory = async (name) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
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
    console.error("Error al crear categoría:", error);
    return null;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
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
    console.error(`Error al actualizar categoría ${id}:`, error);
    return null;
  }
};