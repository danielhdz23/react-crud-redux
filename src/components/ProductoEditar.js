import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from 'react-router-dom'

const ProductoEditar = () => {
  
  const history = useHistory();
  
  const dispatch = useDispatch();

  // Nuevo state del producto
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: 0,
  });

  //Producto a editar
  const productoEditar = useSelector((state) => state.productos.productoEditar);

  // Llenar el state automáticamente
  useEffect(() => {
    guardarProducto(productoEditar);
  }, [productoEditar]);

  // Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, precio } = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    history.push('/')
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>
          </div>
          <form onSubmit={submitEditarProducto}>
            <div className="form-group">
              <label>Nombre Producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                name="nombre"
                value={nombre}
                onChange={onChangeFormulario}
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
                onChange={onChangeFormulario}
              />
            </div>
            <button
              className="btn btn-success font-weight-bold text-uppercase d-block w-100"
              type="submit"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductoEditar;
