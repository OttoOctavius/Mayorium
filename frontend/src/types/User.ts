
export interface User {
    id: string | undefined
    first_name : string
    last_name  : string
    contacto : number
    username : string
    email : string
    password : string
};

export const cargarUsuario = () => {
    let userString = localStorage.getItem("user");
    if(userString == null) return "null";
    let user =  JSON.parse(userString);
    return user.id
}

export interface UserLogin {
    email : string
    password : string
};