import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container-fluid flex-grow-1 p-0">
        <div className="row g-0 h-100">
          <Sidebar />
          <div className="col-md-9 col-lg-10">
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;