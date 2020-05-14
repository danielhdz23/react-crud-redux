import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//use dispatch--permite ejecutar acciones y use selector para acceder al state
//Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from "../actions/alertaActions";

const ProductoNuevo = ({ history }) => {
  // state el componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  // Utilizar useDispatch
  const dispatch = useDispatch();

  // Acceder al state del store
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // Llamar el action de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  // Cuando haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    // Validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios.",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlertaAction(alerta));

      return;
    }
    // si no hay errores
    dispatch(ocultarAlertaAction());
    // Crear nuevo producto
    agregarProducto({
      nombre,
      precio,
    });
    // Redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>
            {alerta ? <h3 className={alerta.classes}>{alerta.msg}</h3> : null}
          </div>
          <form onSubmit={submitNuevoProducto}>
            <div className="form-group">
              <label>Nombre Producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                name="nombre"
                value={nombre}
                onChange={(e) => guardarNombre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Precio Producto</label>
              <input
                type="number"
                className="form-control"
                placeholder="Precio Producto. Ej. $100"
                name="precio"
                value={precio}
                onChange={(e) => guardarPrecio(Number(e.target.value))}
              />
            </div>
            <button
              className="btn btn-success font-weight-bold text-uppercase d-block w-100"
              type="submit"
            >
              Agregar
            </button>
          </form>
          {loading ? <p>Cargando...</p> : null}
          {error ? (
            <p className="alert alert-danger p-2 mt-4 text-center">Error!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductoNuevo;
