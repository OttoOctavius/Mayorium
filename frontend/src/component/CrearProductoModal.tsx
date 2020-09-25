import React, { useState, useRef } from 'react';
import { Row, Col, Button, InputGroup, Modal, Form } from 'react-bootstrap';
//import ReactDOM from 'react-dom';
import { newProducto, Producto } from '../model/Producto';
import { sendProducto } from '../api/mayorista';

const enviarProducto = sendProducto;
/*
const enviarProducto2 = function(prod:Producto){
    const data = new FormData()
        data.append('nombre', prod.nombre);
        data.append('precio', prod.precio.toString());
        data.append('precioPublico', prod.precioPublico.toString());
        data.append('stock', prod.stock.toString());
    //sendProducto(data);
}*/

export default function CrearProductoModal(props:any) {
    const formulario = useRef(null)
    const nombreRef = useRef(null)
    const [nombre, setNombre] = useState<string|undefined>();
    const [precio, setPrecio] = useState<number|undefined>();
    const [precioPublico, setPrecioPublico] = useState<number|undefined>();
    const [stock, setStock] = useState<number>(0);

    const onSend = () => {
        if(nombre == undefined || nombre.length == 0 ) return;

        let prod = newProducto(nombre)
        if(precio && precio > 0) prod.precio = precio;
        if(precioPublico && precioPublico > 0) prod.precioPublico = precioPublico;
        if(stock && stock > 0) prod.stock = stock;
        /*
        let formProducto = ReactDOM.findDOMNode(formulario.current);
        
        for( let elem in formProducto? formProducto.childNodes : []){
            elem.
        }
        formProducto.props no se encuentra?
        */
        enviarProducto(prod).then(console.log,console.log).catch(()=>console.log("no"))
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Nuevo Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form ref={formulario}>
                <Form.Group controlId="nombre">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Producto nuevo"
                            defaultValue={nombre}
                            onChange={(e:any)=>setNombre(e.currentTarget.value)}
                            ref={nombreRef}
                            />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" >
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Precios*</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            type="number"
                            placeholder="Precio"
                            defaultValue={precio}
                            onChange={(e:any)=>setPrecio(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="number"
                            placeholder="Precio para el publico"
                            defaultValue={precioPublico}
                            onChange={(e:any)=>setPrecioPublico(e.currentTarget.value)}
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        *Opcionales
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="stock">
                    <Form.Label>Stock ({stock?stock:0})</Form.Label>
                    <Form.Control
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={stock}
                        onChange={(e:any)=>setStock(e.currentTarget.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Row>
            <Col xs={2} md={1}>
                <Button data-testid="Cerrar" variant="primary" onClick={props.onHide} value="Cerrar" />
            </Col>
            <Col xs={6} md={4}>
            </Col>
            <Col xs={2} md={1}>
                <Button data-testid="Crear" variant="secondary" onClick={onSend} value="Crear" />
            </Col>
        </Row>
        </Modal.Footer>
      </Modal>
    );
}
