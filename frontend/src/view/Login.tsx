import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {signInMayorista} from '../api/mayorista';

const Login : React.FC = (props) => {
    const [validated, setValidated] = useState(false);
    
    function handleSubmit(event:any){
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else{
            const data = new FormData(form) //event.target);
            console.log("data form") 
            console.log("nombre")
            console.log(data.get("nombre"))
            console.log("cont")
            console.log(data.get("contacto"))

            console.log("por mandar")
            signInMayorista(data).then(console.log)
            event.preventDefault();
            event.stopPropagation();
          }
    
        setValidated(true);
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
