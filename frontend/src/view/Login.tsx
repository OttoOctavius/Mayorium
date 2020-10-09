import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { signInMayorista } from '../api/mayorista';
import { UserLogin } from '../types/User';

import { useHistory } from "react-router-dom";
import { signInMinorista } from "../api/minorista";

export interface Props {
    logeado: (esMayorista:boolean) => void
}

const Login : React.FC<Props> = (props) => {
    const [validated, setValidated] = useState(false);
    const [esMayorista, setEsMayorista] = useState(true);
    let history = useHistory();

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
                if( esMayorista )
                    signInMayorista(userlogin).then( async (resp:any) => {
                        let mayoristaResponse = JSON.parse(await resp)[0];
                        //TODO: poner el pk como id!
                        mayoristaResponse.fields.id = mayoristaResponse.pk;
                        //console.log(mayoristaResponse.fields)

                        localStorage.setItem("user", JSON.stringify(mayoristaResponse.fields));
                        //props.logeado(124,mayoristaResponse.fields)
                        history.push("/user");
                        props.logeado(esMayorista);
                    })
                else
                    signInMinorista(userlogin).then( async (resp:any) => {
                        let minoristaResponse = JSON.parse(await resp)[0];
                        //TODO: poner el pk como id!
                        minoristaResponse.fields.id = minoristaResponse.pk;
                        //console.log(mayoristaResponse.fields)

                        localStorage.setItem("user", JSON.stringify(minoristaResponse.fields));
                        //props.logeado(124,mayoristaResponse.fields)
                        history.push("/");
                        props.logeado(esMayorista);
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
                <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Usuario
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="minorista"
                            name="usuario"
                            id="esMinorista"
                            onChange={(e:any)=>setEsMayorista(false)}
                        />
                        <Form.Check
                            type="radio"
                            label="mayorista"
                            name="usuario"
                            id="esMayorista"
                            defaultChecked={true}
                            onChange={(e:any)=>setEsMayorista(true)}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>
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
