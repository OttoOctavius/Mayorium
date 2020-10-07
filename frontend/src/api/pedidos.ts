import { Producto } from "../model/Producto";
import { User, UserLogin } from '../types/User';

type Pedido = any


export const editarPedido = async (id:string, pedido: Pedido) => {
    const response = await fetch("mayorista/pedido/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    if(response.status === 200 || response.status === 404 || response.status === 204) //resultados esperados
        return new Promise((resolve, reject) => { //return response.json()
            if(response.status === 200)
                resolve("¡Éxito!")//se creo correctamente
            else
                reject("esta mal pero no tanto") //fallo por validacion o repeticion
        })
    else
        return Promise.reject("fallo")
}
