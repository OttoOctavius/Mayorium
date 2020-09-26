
export interface Producto {
    id: string | undefined
    nombre : string
    stock  : number
    precio : number
    precioPublico : number
}



export function newProducto(nombre:string):Producto {
    return {"nombre":nombre,precio:0,precioPublico:0,stock:0, id:undefined}
}

export interface LimiteCompra {
    compraMinima : number | undefined
    compraMaxima : number | undefined
}