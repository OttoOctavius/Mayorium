import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, InputGroup, Accordion, Card, AccordionContext, useAccordionToggle } from "react-bootstrap";
import {DividirProductosMayorista as DividirProductos} from "../component/DividirProductos";
import CrearProductoModal from "../component/CrearProductoModal";
import {HacerPedidoModal, EditarPedidoModal} from "../component/HacerPedidoModal";
import {getProductosMayo, getPedidos, confirmarPedido} from "../api/mayorista";
import { Producto } from "../model/Producto";
import { PedidoStock, PedidoProducto, PedidoOrdenCompra } from "../types/Pedido";
import { getOrdenesCompras, confirmarOrdenCompra } from "../api/pedidos";

const MayoristaView : React.FC = (props) => {
    const [producto_modalShow, producto_setModalShow] = React.useState(false);
    const [pedidoCrear_modalShow, pedidoCrear_setModalShow] = React.useState(false);
    const [pedidoEditar_modalShow, pedidoEditar_setModalShow] = React.useState(false);

    const [productos, setProductos] = useState<Producto[]>([])
    const [pedidos, setPedidos] = useState<PedidoStock[]>([])
    const [pedidoEditable, setPedidoEditable] = useState<PedidoStock|undefined>()
    const [ordenesCompra, setOrdenesCompra] = useState<PedidoOrdenCompra[]>([])

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    const cargarProductos = () => getProductosMayo().then(setProductos);
    const cargarPedidos = () => getPedidos().then(setPedidos)
    const cargarOrdenesCompras = () => getOrdenesCompras().then(setOrdenesCompra) 
    const confirmaryActualizar = (id:string) =>{
        confirmarPedido(id).then(()=>{cargarProductos();cargarPedidos();})
    }
        // (res:any) => setPedidos(res.map((ped:any) => { return {...ped.fields, pk:ped.pk}})));

    useEffect( ()=>{
        cargarProductos();
        cargarPedidos();
        cargarOrdenesCompras();
    },[])
    

    const confirmarOrden = (id:string) => {
        confirmarOrdenCompra(id).then(console.log)
    }


    function ContextAwareToggle({ children, eventKey, callback, p, id }:any) {
        const currentEventKey = useContext(AccordionContext);
      
        const decoratedOnClick = useAccordionToggle(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = currentEventKey === eventKey;
      
        return (
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button variant="primary" onClick={decoratedOnClick}>{children}</Button>
                </InputGroup.Prepend>
                <InputGroup.Text> Clave Minorista:{p.minorista} </InputGroup.Text>
                <InputGroup.Append>
                    <Button variant="primary" onClick={()=> confirmarOrden(id)}>Confirmar</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
    
    function comprasMinoristas(){
        return (
        <Accordion>
        {ordenesCompra.map((p:PedidoOrdenCompra, index) => (
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey={index.toString()} p={p} id={p.id}>{p? "pedido(" + p.id + ")": ""}</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body>
                {Object.values(p.productos).map( (prStock:any,indice) =>(
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">{prStock.nombre}({prStock.stock} u)</InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                    ))
                }
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        ) )}
        </Accordion>)
    }


    return <>
    <Container fluid="md">
    <Row>
        <br />

        <Button variant="primary" onClick={() => {producto_setModalShow(true);console.log(productos);}}>
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
        {pedidoEditable === undefined? <></>:
            <EditarPedidoModal
                show={pedidoEditar_modalShow}
                onHide={() => pedidoEditar_setModalShow(false)}
                onSuccess={()=>{cargarPedidos();pedidoEditar_setModalShow(false);}}
                productos={productos}
                pedido={pedidoEditable}
            />
        }
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
                <Button variant="primary" onClick={()=> confirmaryActualizar(p.id)}>Confirmar</Button>
                <Button variant="primary" onClick={() => {pedidoEditar_setModalShow(true);setPedidoEditable(p);}}>Editar</Button>
            </InputGroup>
            <br />
            </>
        ) )}
    </Row>
    
    {comprasMinoristas()}
    </Container>
    </>
}

export default MayoristaView;