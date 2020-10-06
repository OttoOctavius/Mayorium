import { Producto } from "../model/Producto";
import { User, UserLogin } from '../types/User';

export const editarPedido = async (clave:string) => {
    const response = await fetch("mayorista/pedido/editar?clave=" + clave, {
        method: 'POST'})
    //return response.json()
}
