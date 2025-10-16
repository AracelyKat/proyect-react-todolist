import { useEffect, useState } from 'react';
import { getAll } from '../../../services/TagService';
import CreateTag from './CreateTag';

function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const result = await getAll();
      if (result?.data) {
        setTags(result.data);
      } else {
        setTags([]);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary mb-4">Gestión de Etiquetas</h2>
      <CreateTag onCreated={fetchTags} />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {tags.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center text-muted">
                No hay etiquetas registradas
              </td>
            </tr>
          ) : (
            tags.map((tag, index) => (
              <tr key={tag.id}>
                <td>{index + 1}</td>
                <td>{tag.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TagsPage;