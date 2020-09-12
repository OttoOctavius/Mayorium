import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DividirProductos from '../component/DividirProductos';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MinoristaView : React.FC = (props) => {
    const [productos,setProductos] = useState<Producto[]>([])
    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos)
    },[])

    //className="tarjetas_productos"
    return <>
    <Container fluid="md">
        <br />
        {DividirProductos(productos.filter(p => p.stock>0), elemxFila, anchoTarjeta)}
    </Container>
    </>
}

/* 
    <Row>
        
        <Col
            className="container-fluid" 
            style={{textAlign:"center", marginTop:"3px"}}
            xs={9}
            >
            {productos.map( p => <Col xs={6} md={4}> <TarjetaProducto producto={p}/> </Col> )}
        </Col>
    </Row>

className="container-fluid">
                  style={{marginLeft:"38%", width:"24%"}}>
              
className="row justify-content-center justify-items-center" style={{textAlign:"center"}}>
*/

export default MinoristaView;