import { Producto } from "../model/Producto";

export interface PedidoProducto {
    id: string | undefined
    nombre : string
    stock  : number
}

export function newPedidoProducto(pr:Producto) : PedidoProducto {
    return {nombre:pr.nombre, id:pr.id, stock:0}
}


export interface PedidoStock{
    id: string | undefined
    mayorista: string | null
    distribuidor: string | null
    productos : PedidoProducto[]
}