
export interface User {
    id: string | undefined
    first_name : string
    last_name  : string
    contacto : number
    username : string
    email : string
    password : string
};

export const getUsuarioId = () => {
    return cargarUsuario().id
}

export const cargarUsuario : ()=>User= () => {
    let userString = localStorage.getItem("user");
    if(userString == null) return "null";
    let user =  JSON.parse(userString);
    return user
}

export interface UserLogin {
    email : string
    password : string
};