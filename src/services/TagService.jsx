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