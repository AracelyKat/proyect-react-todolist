import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../../services/TagService';

function ShowTagPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTag = async () => {
    const result = await getById(id);
    if (result?.data) {
      setTag(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchTag();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/etiquetas');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!tag) {
    return (
      <div>
        <div className="alert alert-warning">Etiqueta no encontrada</div>
        <button className="btn btn-secondary" onClick={handleBack}>
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary mb-4">Detalle de Etiqueta</h2>
      
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Información de la Etiqueta</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>ID:</strong> {tag.id}</p>
              <p><strong>Nombre:</strong> {tag.name}</p>
              <p><strong>Creada:</strong> {new Date(tag.created_at).toLocaleDateString('es-ES')}</p>
              {tag.updated_at && (
                <p><strong>Actualizada:</strong> {new Date(tag.updated_at).toLocaleDateString('es-ES')}</p>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={handleBack}>
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTagPage;