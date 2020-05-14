import React, { Fragment, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { obtenerProductosAction } from "../actions/productoActions";
import Producto from './Producto';

const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Consultar la API
    const cargarProductos = () => 
      dispatch(obtenerProductosAction());
      cargarProductos();  
  }, [dispatch]);

  //Obtener el state
  const productos = useSelector (state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const cargando = useSelector(state => state.productos.loading)
  console.log(productos)

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>
     {error ? <p className = 'text-center mt-4 font-weight-bold alert alert-danger '>Hubo un error!</p> : null }
     {cargando ? <p className = 'text-center'>Cargando...</p> : null}
      <table className="table table-stripped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {productos.length === 0 ? (<tr><td>No hay productos</td></tr>) : (
                productos.map(producto => (
                    <Producto 
                        key =  {producto.id}
                        producto = {producto}  
                    />
                ))
            )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
