import { useState } from 'react';
import { updateTag } from '../../../services/TagService';

function EditTag({ tag, onUpdated, onCancel }) {
  const [name, setName] = useState(tag.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const result = await updateTag(tag.id, name.trim());
    if (result?.data) {
      if (onUpdated) onUpdated();
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
        />
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditTag;