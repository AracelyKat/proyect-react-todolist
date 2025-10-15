const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "20|42Xeq16I8GNBloWtyqDf5ydQhlEtoZ1XdTTA4prq131efd7f";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
    });
    return await response.json();

  } catch (error) {
    console.error("Error en getAll():", error);
    return [];
  }
};
