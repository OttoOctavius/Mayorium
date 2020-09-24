import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, InputGroup, Modal, Form } from 'react-bootstrap';
import { Producto } from '../model/Producto';
import { sendPedido } from '../api/mayorista';

/*
<Form.Control as="select"> 
    {props.productos.map( (pr:Producto,indice:number) => <option key={indice}>{pr.nombre}</option> )}
</Form.Control>
*/

interface Pedido {
    id: string | undefined
    nombre : string
    stock  : number
}

function mapProducto(pr:Producto) : Pedido {
    return {nombre:pr.nombre, id:pr.nombre, stock:0} //pr.id
}
//func util: Object.assign({}, ['a','b','c'])
//otra es :  Object.fromEntries(entries);

export default function CrearProductoModal(props:any, productos:Producto[]) {
    const formulario = useRef(null)    
    const [parProductoStock, setParProductoStock] = useState({});

    useEffect( ()=>{
        let pares = props.productos.map(mapProducto)
        setParProductoStock(
            Object.assign({}, pares)
        )
    },[props.productos])

    const modPedido = (id:string|undefined, stock:number) => {
        console.log(parProductoStock)
        let mapeo = Object.values(parProductoStock).map( (p:any) => {
            return {...p, 
                stock:p.id==id?stock:p.stock
            }})
        setParProductoStock(
                Object.assign({}, mapeo)
            )
    }

    const onSend = () => {
        let pedidos = Object.values(parProductoStock)
        let pedidosMalos = pedidos.filter( (p:any) => p.stock<0)
        if(pedidosMalos.length>0) return;
        sendPedido(pedidos.filter( (p:any) => p.stock>0)).then(console.log,console.log).catch(()=>console.log("no"))
    }

    function filaProducto(pedido:Pedido, key:number) {
        return (
            <Form.Group controlId={pedido.id} key={key}>
                      <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">{pedido.nombre}</InputGroup.Text>
                          </InputGroup.Prepend>
                            <Form.Control
                                type="number"
                                onChange={(e:any)=>modPedido(pedido.id, parseInt(e.currentTarget.value))}
                                value={pedido.stock}
                            />
                      </InputGroup>
            </Form.Group>
        )
    }

    function getKeys() :Pedido[] {
        return Object.values(parProductoStock)
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
              Hacer pedido
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form ref={formulario}>
                {
                    getKeys().map(
                      (p:Pedido, i:number) => filaProducto(p,i)
                      )
                }
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
                  <Button variant="primary" onClick={onSend} type="submit"> Crear </Button>
              </Col>
          </Row>
          </Modal.Footer>
        </Modal>
      );
}
