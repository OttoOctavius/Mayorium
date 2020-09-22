import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { newProducto, Producto } from '../model/Producto';
import { sendProducto } from '../api/mayorista';

export default function CrearProductoModal(props:any) {
    const formulario = useRef(null)
    const nombreRef = useRef(null)
    const [nombre, setNombre] = useState<string|undefined>();
    const [precio, setPrecio] = useState<number|undefined>();
    const [precioPublico, setPrecioPublico] = useState<number|undefined>();
    const [stock, setStock] = useState<number>(0);

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
                  <Button variant="primary" onClick={props.onHide}>Cerrar</Button>
              </Col>
              <Col xs={6} md={4}>
              </Col>
              <Col xs={2} md={1}>
                  <Button variant="primary" onClick={()=>{}} type="submit"> Crear </Button>
              </Col>
          </Row>
          </Modal.Footer>
        </Modal>
      );
}
