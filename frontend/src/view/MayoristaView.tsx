import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import DividirProductos from '../component/DividirProductos';
import CrearProductoModal from '../component/CrearProductoModal';
import HacerPedidoModal from '../component/HacerPedidoModal';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MayoristaView : React.FC = (props) => {
    const [producto_modalShow, producto_setModalShow] = React.useState(false);
    const [pedido_modalShow, pedido_setModalShow] = React.useState(false);
    
    const [productos, setProductos] = useState<Producto[]>([])
    //const [partidas, setPartidas] = useState<Producto[]>([])

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos)
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
        />

    </Row>
        
    <br />
    {DividirProductos(productos, elemxFila, anchoTarjeta)}
    
    <Row>
        Partidas
        <br />

        <Button variant="primary" onClick={() => pedido_setModalShow(true)}>
            Preparar pedido
        </Button>

        <HacerPedidoModal
            show={pedido_modalShow}
            onHide={() => pedido_setModalShow(false)}
        />

    </Row>
    
    </Container>
    </>
}

export default MayoristaView;