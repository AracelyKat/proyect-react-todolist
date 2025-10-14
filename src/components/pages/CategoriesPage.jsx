import { useEffect, useState } from 'react';
import { getAll } from '../../../services/CategoryService';
import CreateCategory from './CreateCategory';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await getAll().catch(() => null);
    if (result?.data) {
      setCategories(result.data);
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-primary mb-4">Gestión de Categorías</h2>

      <CreateCategory onCreated={fetchCategories} />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center text-muted">No hay categorías registradas</td>
            </tr>
          ) : (
            categories.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesPage;
