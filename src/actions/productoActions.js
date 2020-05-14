import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
//Aca se inserta en la bd o mandar a ejecutar el reducer para modificar el state
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar en la API
      await clienteAxios.post("/productos", producto);
      //Si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));
      //Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente.", "success");
    } catch (error) {
      console.log(error);
      // Si hay error cambiar el state
      dispatch(agregarProductoError(true));
      // Alerta de error
      Swal.fire({
        icon: "error",
        text: "El producto no se pudo agregar correctamente.",
        title: "Error!",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// Si el producto se guarda en la bd
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// Si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      setTimeout(async () =>{
        const respuesta = await clienteAxios.get("/productos");
        console.log(respuesta.data)
        dispatch(descargarProductosExitosa(respuesta.data));
      },3000)
    } catch (error) {
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//Selecciona y elimina el producto
export function eliminarProductoAction(id){
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      //insertar en la API
      await clienteAxios.delete(`/productos/${id}`);
      //Si todo sale bien, actualizar el state
      dispatch(eliminarProductoExito());
      //Alerta
      Swal.fire("Correcto", "El producto se ha eliminado correctamente.", "success");
    } catch (error) {
      console.log(error);
      // Si hay error cambiar el state
      dispatch(eliminarProductoError());
      // Alerta de error
      Swal.fire({
        icon: "error",
        text: "El producto no se pudo eliminar.",
        title: "Error!",
      });
    }
  };
}

const obtenerProductoEliminar = id =>({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
})


//Colocar producto en edición
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto))
  }
}
const obtenerProductoEditarAction = (producto) =>({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

// Editar registros en la api y el state
export function editarProductoAction(producto){
  return async (dispatch) => {
    dispatch(editarProducto())
    try {
      //insertar en la API
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      //Si todo sale bien, actualizar el state
      dispatch( editarProductoExito(producto) )
      //Alerta
      Swal.fire("Correcto", "El producto se ha editado correctamente.", "success");
    } catch (error) {
      console.log(error);
      // Si hay error cambiar el state
      dispatch(editarProductoError());
      // Alerta de error
      Swal.fire({
        icon: "error",
        text: "El producto no se pudo editar.",
        title: "Error!",
      });
    }
  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

const editarProductoError = (producto) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
})