
export interface Producto {
    id: string | undefined
    _id: string | undefined //Posiblemente no va
    nombre : string
    stock  : number
    precio : number
    precioPublico : number
    imagen: string
}



export function newProducto(nombre:string):Producto {
    return {"nombre":nombre,precio:0,precioPublico:0,stock:0, id:undefined, _id:undefined, imagen:""}
}

export interface LimiteCompra {
    compraMinima : number | undefined
    compraMaxima : number | undefined
}