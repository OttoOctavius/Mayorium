import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {signInMayorista} from '../api/mayorista';
import {User, UserLogin} from '../types/User';

export interface Props {
    logeado: (clave:number, usuario:User) => void
}

const Login : React.FC<Props> = (props) => {
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
            let email = data.get("email") as string
            let pass = data.get("password") as string
            if( email!== null && email.length !== 0 && pass!== null && pass.length !== 0 ){
                let userlogin : UserLogin = {
                    email : email,
                    password : pass  
                }
                signInMayorista(userlogin).then( async (resp:any) => {
                    let mayoristaResponse = JSON.parse(await resp)[0]
                    props.logeado(124,mayoristaResponse.fields)
                })
            }
            setValidated(true);
        }
    }

    return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <Form.Group className="form-group">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        name="email"
                        className="form-control"
                        required
                        type="email"
                        placeholder="aaaa@aaaa.com"
                        defaultValue=""
                    />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="password"
                        className="form-control"
                        required
                        type="password"
                        placeholder="Enter password"
                        />
                </Form.Group>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </Form>
            </div>
            </div>
        );
}

export default Login;
