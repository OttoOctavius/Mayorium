import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import {ProductoMinoristaCard as TarjetaProducto} from '../component/ProductoMinoristaCard';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MinoristaView : React.FC = (props) => {
    
    const [productos,setProductos] = useState<Producto[]>([])
    
    useEffect( ()=>{
        getProductos().then(setProductos)
    },[])

    //className="tarjetas_productos"
    
    return <>
    <Container fluid="md">
    <Row>
        <Col className="mb-3" xs={3}>
        asfv
        </Col>
        <Col
            className="container-fluid" 
            style={{textAlign:"center", marginTop:"3px"}}
            xs={9}
            >
            {productos.map( p => <Col xs={6} md={4}> <TarjetaProducto producto={p}/> </Col> )}
        </Col>
    </Row>
    </Container>
    </>
}

/* 
className="container-fluid">
                  style={{marginLeft:"38%", width:"24%"}}>
              
className="row justify-content-center justify-items-center" style={{textAlign:"center"}}>
*/

export default MinoristaView;