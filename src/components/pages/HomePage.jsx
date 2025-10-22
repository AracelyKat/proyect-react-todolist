import React from 'react';

const HomePage = () => {
  return (
    <div className="text-center mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4 text-primary">Hello World!</h1>
        <p className="lead">Bienvenido a tu aplicación TO DO LIST</p>
        <hr className="my-4" />
        <p>Comienza gestionando tus tareas desde el menú lateral.</p>
        <div className="mt-4">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Tareas</h5>
                  <p className="card-text">Gestiona tus tareas pendientes</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Categorías</h5>
                  <p className="card-text">Organiza por categorías</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Etiquetas</h5>
                  <p className="card-text">Etiqueta tus tareas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;