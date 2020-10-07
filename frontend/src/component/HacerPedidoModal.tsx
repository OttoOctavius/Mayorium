import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, InputGroup, Modal, Form } from "react-bootstrap";
import { PedidoProducto, newPedidoProducto } from "../types/Pedido";
import { sendPedido } from "../api/mayorista";
import { editarPedido } from "../api/pedidos";

/*
<Form.Control as="select"> 
    {props.productos.map( (pr:Producto,indice:number) => <option key={indice}>{pr.nombre}</option> )}
</Form.Control>
*/


//func util: Object.assign({}, ["a","b","c"])
//otra es :  Object.fromEntries(entries);

export function HacerPedidoModal(props:any) {
    let pares = props.productos.map(newPedidoProducto)
    //console.log(props.productos)
    return PedidoModal(props, Object.assign({}, pares), sendPedido)
}

export function EditarPedidoModal(props:any) {
    let pares = Object.assign({}, props.productos.map(newPedidoProducto))
    let productosPrevios = props.pedido.productos
    let arrPrevios = Object.values(productosPrevios)
    /*console.log("pares previos")
    console.log(arrPrevios)
    console.log("pares pedidos")*/

    let dicPrevios = Object.assign({},...arrPrevios.map((key:any) => ({[key.id]: parseInt(key.stock)})));
    //console.log(dicPrevios)
    let mapeo = Object.values(pares).map( (p:any) => {
        return {...p , stock:dicPrevios[p.id]!==undefined?dicPrevios[p.id]:0
    }})
    console.log(props.pedido)
    return PedidoModal(props, mapeo, (p:any) => editarPedido(props.pedido.id,p))
}

//Pedido[]=>Promise<any>
export default function PedidoModal(props:any, pedidoInicial:object, enviar:((pedidos:any)=>any)) {
    const formulario = useRef(null)    
    const [parProductoStock, setParProductoStock] = useState({});
    const [huboFalla, setHuboFalla] = useState<string>("");

    useEffect( ()=>{
        setParProductoStock(pedidoInicial)
    },[props.productos])

    const modPedido = (id:string|undefined, stock:number) => {
        console.log(parProductoStock)
        let mapeo = Object.values(parProductoStock).map( (p:any) => {
            return {...p, 
                stock:p.id===id?stock:p.stock
            }})
        setParProductoStock(
                Object.assign({}, mapeo)
            )
    }

    const onSend = () => {
        let pedidos = Object.values(parProductoStock)
        let pedidosMalos = pedidos.filter( (p:any) => p.stock<0)
        if(pedidosMalos.length>0) return;
        enviar(pedidos.filter( (p:any) => p.stock>0))
        //sendPedido(pedidos.filter( (p:any) => p.stock>0))
            .then(props.onSuccess, setHuboFalla).catch(setHuboFalla)
    }

    function filaProducto(pedido:PedidoProducto, key:number) {
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

    function getKeys() :PedidoProducto[] {
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
                      (p:PedidoProducto, i:number) => filaProducto(p,i)
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
                {
                    huboFalla === ""? 
                        <> </> :
                        <Form.Label>{huboFalla}</Form.Label>
                }
            </Col>
              <Col xs={2} md={1}>
                  <Button variant="primary" onClick={onSend} type="submit"> Crear </Button>
              </Col>
          </Row>
          </Modal.Footer>
        </Modal>
      );
}
