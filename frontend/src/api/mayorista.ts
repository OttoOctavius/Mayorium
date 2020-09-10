import { Producto } from "../model/Producto";

export const getProductos = async () => {
    const response = await fetch("mayorista/productos", {
        method: 'GET'})
    return response.json()
}

export const sendProducto = async (producto:Producto) => { //FormData
    const response = await fetch("mayorista/producto", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto),
    })
    if(response.status == 201 || response.status == 400) //resultados esperados
        return new Promise((resolve, reject) => { //return response.json()
        if(response.status == 201) resolve("¡Éxito!")//se creo correctamente
        if(response.status == 400) reject("esta mal pero no tanto") //fallo por validacion o repeticion
    })
    else
        return Promise.reject("fallo")
}
