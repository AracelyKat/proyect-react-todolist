import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/tareas', label: 'Tareas', icon: '📝' },
    { path: '/categorias', label: 'Categorías', icon: '🗂️' },
    { path: '/etiquetas', label: 'Etiquetas', icon: '🏷️' }
  ];

  return (
    <div className="col-md-3 col-lg-2 bg-light border-end p-0">
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <h5 className="text-primary mb-3 border-bottom pb-2">Menú Principal</h5>
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <Link
                className={`nav-link ${location.pathname === item.path ? 'active' : 'text-dark'}`}
                to={item.path}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;