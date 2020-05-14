import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger justify-content-between">
      <div className="container">
        <h3>
          <Link to={"/"} className="text-light">
            CRUD React, Redux, Rest API & Axios
          </Link>
        </h3>
        <Link
          className="btn btn-primary nuevo-post d-block d-md-inline-block"
          to="/productos/nuevo"
        >
          Agregar Producto &#43;
        </Link>
      </div>
    </nav>
  );
};

export default Header;
