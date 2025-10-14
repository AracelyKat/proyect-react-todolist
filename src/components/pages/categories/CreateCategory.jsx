import { useState } from 'react';
import { createCategory } from '../../../services/CategoryService';

function CreateCategory({ onCreated }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    const result = await createCategory(name.trim());
    if (result?.data) {
      setSuccess("Categoría creada correctamente");
      setName("");
      if (onCreated) onCreated();
    } else {
      setError("Error al crear la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Crear</button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
      {success && <div className="text-success mt-2">{success}</div>}
    </form>
  );
}

export default CreateCategory;
