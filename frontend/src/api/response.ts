

export const respuestaCrear = (response:Response) => respuestaTemplate(response, 201, [400]);
export const respuestaUpdate= (response:Response) => respuestaTemplate(response, 200, [204,404]);
export const respuestaOk = (response:Response) => respuestaTemplate(response, 200, [204,404]);


const respuestaTemplate = (response:Response, statusEsperado:number, statusOtros:number[]) => {
    if(response.status === statusEsperado || statusOtros.includes(response.status)) //resultados esperados
        return new Promise((resolve, reject) => { //return response.json()
            if(response.status === statusEsperado)
                resolve("¡Éxito!")//se creo correctamente
            else
                reject("esta mal pero no tanto") //fallo por validacion o repeticion
        })
    else
        return Promise.reject("fallo")
}
