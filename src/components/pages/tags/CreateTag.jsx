import { useState } from 'react';
import { createTag } from '../../../services/TagService';

function CreateTag({ onCreated }) {
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

    const result = await createTag(name.trim());
    if (result?.data) {
      setSuccess("Etiqueta creada correctamente");
      setName("");
      if (onCreated) onCreated();
    } else {
      setError("Error al crear la etiqueta");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la etiqueta"
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

export default CreateTag;