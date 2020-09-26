import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {signUpMayorista} from '../api/mayorista';
import {User} from '../types/User';

const SignUp : React.FC = (props) => {
    const [validated, setValidated] = useState(false);
    
    function handleSubmit(event:any){
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            return;
        }
        else{
            const data = new FormData(form)
            //if( data.get("first_name") === data.get("password2"))
            if( data.get("password1") === data.get("password2")){
                let user : User = {
                    first_name : data.get("first_name") as string,
                    last_name : data.get("last_name") as string,
                    contacto : parseInt(data.get("contacto") as string,10),
                    username : data.get("username")  as string,
                    email : data.get("email")  as string,
                    password : data.get("password1")  as string
                }
                /*data.append("password", data.get("password1") as string)
                data.delete("password1")
                data.delete("password2")
                console.log(user)*/
                
                signUpMayorista(user).then(console.log)
            }
            else {
                //debe fallar el formulario
            }
            
          }
    
        setValidated(true);
    }

    return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <Form.Group className="form-group">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        name="first_name"
                        className="form-control"
                        required
                        type="text"
                        placeholder="Elven"
                        defaultValue=""
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        name="last_name"
                        className="form-control"
                        required
                        type="text"
                        placeholder="Dedor"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Looks good Turner!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        name="username"
                        className="form-control"
                        required
                        type="text"
                        placeholder="Dedor"
                        defaultValue=""
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        name="email"
                        className="form-control"
                        type="email"
                        placeholder="aaaa@aaaa.com"
                        defaultValue=""
                    />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Telefono Contacto</Form.Label>
                    <Form.Control 
                        name="contacto"
                        className="form-control"
                        type="number"
                        placeholder="1234567890"
                        defaultValue=""
                        />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control 
                        name="password1"
                        className="form-control"
                        required
                        type="password"
                        placeholder="password"
                        />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Confirmar Password</Form.Label>
                    <Form.Control 
                        name="password2"
                        className="form-control"
                        required
                        type="password"
                        placeholder="password"
                        />
                </Form.Group>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </Form>
            </div>
            </div>
        );
}

export default SignUp;
