import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
//import {ProductoMinoristaCard as TarjetaProducto} from '../component/ProductoMinoristaCard';

import CrearProductoModal from '../component/CrearProductoModal';
//import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';

const MayoristaView : React.FC = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

    const [productos,setProductos] = useState<Producto[]>([])
    /*
    useEffect( ()=>{
        getProductos().then(setProductos)
    },[])  
    */
    return <>
    <Container fluid="md">
    <Row>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Crear Producto
        </Button>

      <CrearProductoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    
    </Row>
    <Row>
        <Col className="mb-3" xs={3}>
        
        </Col>
        <Col
            className="container-fluid" 
            style={{textAlign:"center", marginTop:"3px"}}
            xs={9}
            >
            tarjetas nuevas
            {/*productos.map( p => <Col xs={6} md={4}> <TarjetaProducto producto={p}/> </Col> )*/}
        </Col>
    </Row>
    </Container>
    </>
}

export default MayoristaView;