import { Producto } from "../model/Producto";
import { User, UserLogin } from '../types/User';

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
    if(response.status === 201 || response.status === 400) //resultados esperados
        return new Promise((resolve, reject) => { //return response.json()
        if(response.status === 201) resolve("¡Éxito!")//se creo correctamente
        if(response.status === 400) reject("esta mal pero no tanto") //fallo por validacion o repeticion
    })
    else
        return Promise.reject("fallo")
}

export const signInMayorista = async (formulario:UserLogin) => { //FormData
    const response = await fetch("mayorista/sign-in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario),
    })
    if(response.status === 200 || response.status === 400) //resultados esperados
        return new Promise((resolve, reject) => {
            if(response.status === 200) resolve(response.json())//se creo correctamente
            if(response.status === 400) reject("response") //fallo por validacion o repeticion
        })
    else
        return Promise.reject("fallo")
}

export const signUpMayorista = async (formulario:User) => {
    const response = await fetch("mayorista/sign-up", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario),
        /*JSON.stringify(
            {
                "form_data":formulario
            }
        ) //JSON.stringify(formulario),*/
    })
    if(response.status === 201 || response.status === 400) //resultados esperados
        return new Promise((resolve, reject) => { //return response.json()
            if(response.status === 201) resolve("¡Éxito!")//se creo correctamente
            if(response.status === 400) reject("esta mal pero no tanto") //fallo por validacion o repeticion
        })
    else
        return Promise.reject("fallo")
}