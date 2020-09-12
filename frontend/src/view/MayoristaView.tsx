import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DividirProductos from '../component/DividirProductos';
import CrearProductoModal from '../component/CrearProductoModal';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MayoristaView : React.FC = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [productos,setProductos] = useState<Producto[]>([])

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos)
    },[])  
    
    return <>
    <Container fluid="md">
    <Row>
        <br />

        <Button variant="primary" onClick={() => setModalShow(true)}>
            Crear Producto
        </Button>

        <CrearProductoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </Row>
        
    <br />
    {DividirProductos(productos, elemxFila, anchoTarjeta)}
    
    </Container>
    </>
}

export default MayoristaView;