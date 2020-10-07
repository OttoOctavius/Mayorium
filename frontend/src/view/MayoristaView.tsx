import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import DividirProductos from "../component/DividirProductos";
import CrearProductoModal from "../component/CrearProductoModal";
import {HacerPedidoModal, EditarPedidoModal} from "../component/HacerPedidoModal";
import {getProductos, getPedidos, confirmarPedido} from "../api/mayorista";
import { Producto } from "../model/Producto";
import { PedidoStock, PedidoProducto } from "../types/Pedido";

const MayoristaView : React.FC = (props) => {
    const [producto_modalShow, producto_setModalShow] = React.useState(false);
    const [pedidoCrear_modalShow, pedidoCrear_setModalShow] = React.useState(false);
    const [pedidoEditar_modalShow, pedidoEditar_setModalShow] = React.useState(false);

    const [productos, setProductos] = useState<Producto[]>([])
    const [pedidos, setPedidos] = useState<PedidoStock[]>([])

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    const cargarProductos = () => getProductos().then(setProductos);
    const cargarPedidos = () => getPedidos().then(setPedidos)

        // (res:any) => setPedidos(res.map((ped:any) => { return {...ped.fields, pk:ped.pk}})));

    useEffect( ()=>{
        cargarProductos();
        cargarPedidos();
    },[])
    
    return <>
    <Container fluid="md">
    <Row>
        <br />

        <Button variant="primary" onClick={() => producto_setModalShow(true)}>
            Crear Producto
        </Button>

        <CrearProductoModal
            show={producto_modalShow}
            onHide={() => producto_setModalShow(false)}
            onSuccess={()=>{cargarProductos();producto_setModalShow(false);}}
        />

    </Row>
        
    <br />
    {DividirProductos(productos, elemxFila, anchoTarjeta)}
    
    <Row>
        Partidas
        <br />

        <Button variant="primary" onClick={() => pedidoCrear_setModalShow(true)}>
            Preparar pedido
        </Button>

        <HacerPedidoModal
            show={pedidoCrear_modalShow}
            onHide={() => pedidoCrear_setModalShow(false)}
            onSuccess={()=>{cargarPedidos();pedidoCrear_setModalShow(false);}}
            productos={productos}
        />

        {pedidos.map((p:any) => (
            <> 
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{p? "pedido(" + p.id + ")": ""}</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                    {Object.values(p.productos).map( (prStock:any,indice) =>(
                        <>
                        <Col>Nombre:{prStock.nombre}</Col>
                        <Col>Stock: {prStock.stock}</Col>
                        </>
                    ))
                    }
                </InputGroup.Text>
                <Button variant="primary" onClick={() => confirmarPedido(p.id)}>Confirmar</Button>
                <Button variant="primary" onClick={() => pedidoEditar_setModalShow(true)}>Editar</Button>
                <EditarPedidoModal
                    show={pedidoEditar_modalShow}
                    onHide={() => pedidoEditar_setModalShow(false)}
                    onSuccess={()=>{cargarPedidos();pedidoEditar_setModalShow(false);}}
                    productos={productos}
                    pedido={p}
                />
            </InputGroup>
            <br />
            </>
        ) )}

    </Row>
    
    </Container>
    </>
}

export default MayoristaView;