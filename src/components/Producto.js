import React from "react";
import { useHistory  } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";

import { eliminarProductoAction, obtenerProductoEditar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory(); //Habilitar history para redirección

  //Confirmar si desea eliminar
  const confirmarEliminarProducto = (id) => {
    //Preguntar

    Swal.fire({
      title: "Estás seguro de eliminar el producto?",
      text: "Esta acción no es revertible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        //Pasar al action
        dispatch(eliminarProductoAction(id));
      }
    });
  };

  //Función que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto))
    history.push(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button type= 'button' onClick = { () => redireccionarEdicion(producto)} className="btn btn-primary mr-2">
          Editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
