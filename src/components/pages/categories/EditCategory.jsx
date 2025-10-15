import { useState } from 'react';
import { updateCategory } from '../../../services/CategoryService';

function EditCategory({ category, onUpdated, onCancel }) {
  const [name, setName] = useState(category.name);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setLoading(true);
    const result = await updateCategory(category.id, name.trim());
    setLoading(false);

    if (result?.data) {
      if (onUpdated) onUpdated();
    } else {
      setError("Error al actualizar la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}

export default EditCategory;