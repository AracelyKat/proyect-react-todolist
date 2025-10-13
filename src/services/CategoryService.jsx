const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "18|7H3bwcu642f9T7OTLPmuUwz0dy5lzRyECR3nrYfN34fa5c67";

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
