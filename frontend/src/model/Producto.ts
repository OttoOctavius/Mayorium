
export interface Producto {
    id: string | undefined
    _id: string | undefined //Posiblemente no va
    nombre : string
    stock  : number
    precio : number
    precioPublico : number
    imagen: string
    variantes:string[]|VarianteProducto[]|undefined
    owner: string | null | undefined
    owner_id: string | null | undefined
}

export interface VarianteProducto {
    variante : string
    stock : number
    hide : boolean
}

export const mostrarVarianteProducto = (pr:Producto) =>{
    if(pr.variantes === undefined) return [""];
    if(typeof pr.variantes === 'string')
        return [pr.variantes];
    else
        return (pr.variantes as VarianteProducto[]).map(varianteProductoToString);
}

const varianteProductoToString = (vp:VarianteProducto) => vp.variante + '(' + vp.stock.toString() + ')';

export function newProducto(nombre:string):Producto {
    return {"nombre":nombre,precio:0,precioPublico:0,stock:0
        ,id:undefined, _id:undefined
        ,imagen:""
        ,variantes:[]
        ,owner:null
        ,owner_id:null}
}

export interface LimiteCompra {
    compraMinima : number | undefined
    compraMaxima : number | undefined
}