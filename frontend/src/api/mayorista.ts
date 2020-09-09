export const server = "http://127.0.0.1:8000";

var conf = {
    method: 'GET',
    headers: {
                   'Access-Control-Allow-Origin':'*',
                   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                   'Content-Type': 'application/json'
                },
               mode: "no-cors",
               //cache: 'default',
    };

//body: JSON.stringify(objeto)

export const getProductos = async () => {
    const response = await fetch("mayorista/productos", {
        method: 'GET'})
    return response.json()
}
