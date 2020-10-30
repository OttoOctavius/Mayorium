import { Producto } from "../model/Producto";
import { User, UserLogin, getUsuarioId } from '../types/User';
import { PedidoOrdenCompra } from "../types/Pedido";

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

export const getPedidos = async () => {
    const response = await fetch("minorista/ordencompras/" + getUsuarioId() , {
        method: 'GET'})
    //viene diferente a productos, se pre procesa aqui para dejarlo similar al type
    return response.text().then(JSON.parse)
        .then(res=>res.map((r:any)=> {r.fields.id=r.pk; r.fields.productos = JSON.parse(r.fields.productos); return r.fields}))
        //.then(r=>{console.log(r);return r});
        //.then((res:any) => res.map((ped:any) => { return {...ped.fields, pk:ped.pk}}));
}

export const sendPedido = async (pedido:PedidoOrdenCompra) => {
    let usuario = getUsuarioId();
    pedido.minorista = usuario?usuario:null;
    const response = await fetch("minorista/newordencompra/" + usuario, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido),
    })
    if(response.status === 201 || response.status === 400)
        return new Promise((resolve, reject) => {
        if(response.status === 201) resolve(response)
        if(response.status === 400) reject("Datos invalidos")
    })
    else
        return Promise.reject("fallo")
}

export const confirmarPedido = async (clave:string) => {
    const response = await fetch("minorista/ordencompra/confirmar/" + clave, {
        method: 'GET'})
    //return response.json()
}
