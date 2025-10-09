import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white shadow">
      <div className="container-fluid d-flex align-items-center justify-content-between p-3">
        <h4 className="mb-0">
          <Link to="/" className="text-white text-decoration-none">
            🗒️ TO DO LIST
          </Link>
        </h4>
        <nav>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tareas">TAREAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/categorias">CATEGORIAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/etiquetas">ETIQUETAS</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;