import { Producto } from "../model/Producto";

export interface PedidoProducto {
    id: string | undefined
    nombre : string
    stock  : number
}

export function newPedidoProducto(pr:Producto, stock=0) : PedidoProducto {
    return {nombre:pr.nombre, id:pr.id, stock:stock}
}

export interface PedidoOrdenCompra{
    id: string | undefined
    mayorista: string | null
    minorista: string | null
    productos : PedidoProducto[]
}

export interface PedidoStock{
    id: string | undefined
    mayorista: string | null
    distribuidor: string | null
    productos : PedidoProducto[]
}