
export interface Producto {
    nombre : string
    stock  : number
    precio : number
    precioPublico : number
}

export interface LimiteCompra {
    compraMinima : number | undefined
    compraMaxima : number | undefined
}