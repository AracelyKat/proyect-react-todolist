import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../../services/CategoryService';

function ShowCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    const result = await getById(id);
    if (result?.data) {
      setCategory(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/categorias');
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

  if (!category) {
    return (
      <div>
        <div className="alert alert-warning">Categoría no encontrada</div>
        <button className="btn btn-secondary" onClick={handleBack}>
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary mb-4">Detalle de Categoría</h2>
      
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Información de la Categoría</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>ID:</strong> {category.id}</p>
              <p><strong>Nombre:</strong> {category.name}</p>
              <p><strong>Creada:</strong> {new Date(category.created_at).toLocaleDateString('es-ES')}</p>
              {category.updated_at && (
                <p><strong>Actualizada:</strong> {new Date(category.updated_at).toLocaleDateString('es-ES')}</p>
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

export default ShowCategory;