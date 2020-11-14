import { Producto } from "../model/Producto";
import { User, UserLogin, getUsuarioId } from '../types/User';
import { respuestaCrear, respuestaOk } from "./response";

type Pedido = any


export const editarPedido = async (id:string, pedido: Pedido) => {
    const response = await fetch("mayorista/pedido/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    });
    return respuestaOk(response);
}

export const getOrdenesCompras = async () => {
    const response = await fetch("mayorista/ordencompra/" + getUsuarioId() , {
        method: 'GET'})
    //viene diferente a productos, se pre procesa aqui para dejarlo similar al type
    return response.text().then(JSON.parse)
        .then(res=>res.map((r:any)=> {r.fields.id=r.pk; r.fields.productos = JSON.parse(r.fields.productos); return r.fields}))
        .then(r=>{console.log(r);return r});
        //.then((res:any) => res.map((ped:any) => { return {...ped.fields, pk:ped.pk}}));
}

export const confirmarOrdenCompra = async (id:string) => {
    const response = await fetch("mayorista/ordencompra/confirmar/" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return respuestaOk(response);
}
