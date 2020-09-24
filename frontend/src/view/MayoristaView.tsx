import React, { useState, useEffect } from 'react';
import { Container, Row, Button, InputGroup } from 'react-bootstrap';
import DividirProductos from '../component/DividirProductos';
import CrearProductoModal from '../component/CrearProductoModal';
import HacerPedidoModal from '../component/HacerPedidoModal';
import {getProductos, getPedidos, confirmarPedido} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MayoristaView : React.FC = (props) => {
    const [producto_modalShow, producto_setModalShow] = React.useState(false);
    const [pedido_modalShow, pedido_setModalShow] = React.useState(false);
    
    const [productos, setProductos] = useState<Producto[]>([])
    const [pedidos, setPedidos] = useState([])

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos)
        getPedidos().then( (res:any) => setPedidos(res.map((ped:any) => { return {...ped.fields, pk:ped.pk}})))
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
            productos={productos}
        />

        {pedidos.map((p:any) => (
            <> 
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{p? "pedido(" + p.pk + ")": ""}</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{Object.values(p.productos)}</InputGroup.Text>
                <Button variant="primary" onClick={() => confirmarPedido(p.pk)}>Confirmar</Button>
            </InputGroup>
            <br />
            </>
        ) )}

    </Row>
    
    </Container>
    </>
}

export default MayoristaView;