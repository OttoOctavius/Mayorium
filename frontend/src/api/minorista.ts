import { Producto } from "../model/Producto";
import { User, UserLogin } from '../types/User';

export const signInMinorista = async (formulario:UserLogin) => { //FormData
    const response = await fetch("minorista/sign-in", {
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

export const signUpMinorista = async (formulario:User) => {
    const response = await fetch("minorista/sign-up", {
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
            if(response.status === 201) resolve(response.json())//se creo correctamente
            if(response.status === 400) reject("esta mal pero no tanto") //fallo por validacion o repeticion
        })
    else
        return Promise.reject("fallo")
}