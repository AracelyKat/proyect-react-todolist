import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <header className="bg-black text-white shadow">
      <div className="container-fluid d-flex align-items-center justify-content-between p-3">
        <h4 className="mb-0">
          <Link to="/" className="text-white text-decoration-none">
            TO DO LIST
          </Link>
        </h4>
        <nav>
          <ul className="nav nav-pills align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tareas">TAREAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/categorias">CATEGORIAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/etiquetas">ETIQUETAS</Link>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-outline-light btn-sm ms-2"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;