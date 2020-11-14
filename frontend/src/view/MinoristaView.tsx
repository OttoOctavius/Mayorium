import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, Button, Col, Accordion, Card, Row, AccordionContext, useAccordionToggle } from 'react-bootstrap';
import {DividirProductosMinorista as DividirProductos} from '../component/DividirProductos';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';
import { User, cargarUsuario } from '../types/User';
import { PedidoOrdenCompra, PedidoProducto, newPedidoProducto, PedidoStock} from "../types/Pedido";
import { sendPedido, editarPedido, getPedidos, confirmarPedido } from "../api/minorista";

class OrdenCompra implements PedidoOrdenCompra{
    id: string | undefined;    mayorista: string | null;
    minorista: string | null;
    productos: PedidoProducto[];

    constructor(minorista: string | null,mayorista:string){
        this.minorista = minorista
        this.mayorista = mayorista
        this.productos = []
    }

    agregarProducto(pr:Producto, stock=0) : void {
        let indice = this.productos.findIndex(p=>p.id===pr.id);
        if( indice==-1 )
            this.productos.push(newPedidoProducto(pr));
        else{
            let copiaProductos = this.productos;
            copiaProductos[indice].stock += stock;
            this.productos = copiaProductos;
        }
    }
}

const MinoristaView : React.FC = (props) => {
    const [productos,setProductos] = useState<Producto[]>([])
    const [pedidoCrear_modalShow, pedidoCrear_setModalShow] = React.useState(false);
    const [pedidoEditar_modalShow, pedidoEditar_setModalShow] = React.useState(false);
    const [pedidos, setPedidos] = useState<OrdenCompra[]>([])//PedidoOrdenCompra
    const [pedidoEditable, setPedidoEditable] = useState<OrdenCompra|undefined>() //OrdenCompra

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos);
        if(cargarUsuario()!==undefined){
            getPedidos().then(p=>setPedidos(p as OrdenCompra[]));
        }
    },[])

    const nuevoPedido = (mayorista:string) => {
        return new OrdenCompra(null, mayorista);
    }
    const agregarProducto = (pr:Producto) => {
        if(pr.owner_id === undefined || pr.owner_id == null ) return;
        let pedido = (pedidoEditable===undefined)? nuevoPedido(pr.owner_id):pedidoEditable;
        console.log(pedido)

        //pedido.agregarProducto(pr,1);
        agregarProductoAPedido(pedido, pr,1);
        
        if(pedidoEditable===undefined)
            setPedidos([...pedidos, pedido]);
        else
            setPedidos(pedidos.map( p => p === pedidoEditable?pedido:p));
        setPedidoEditable(pedido);
    }

    const agregarProductoAPedido = (pedido:PedidoOrdenCompra,pr:Producto, stock=0) : void => {
        let indice = pedido.productos.findIndex(p=>p.id===pr.id);
        if( indice==-1 )
        pedido.productos.push(newPedidoProducto(pr));
        else{
            let copiaProductos = pedido.productos;
            let nuevoStock = stock + parseInt(copiaProductos[indice].stock.toString());
            copiaProductos[indice].stock = Math.max(0, nuevoStock);
            pedido.productos = copiaProductos;
        }
    }

    function esProductoDeMayorista(pr:Producto){
        return pedidoEditable===undefined? true: pr.owner_id === pedidoEditable.mayorista;
    }

    const onSend = (pedidoAGuardar:OrdenCompra) => {
        console.log(pedidoAGuardar.id)
        //return;
        if(pedidoAGuardar.id===undefined)
            sendPedido(pedidoAGuardar)
            //sendPedido(pedidos.filter( (p:any) => p.stock>0))
                .then(console.log) //, setHuboFalla).catch(setHuboFalla)
        else
            editarPedido(pedidoAGuardar)
            //sendPedido(pedidos.filter( (p:any) => p.stock>0))
                .then(console.log) //, setHuboFalla).catch(setHuboFalla)
    }
    
    //TODO: No deberia tener que guardar antes!!
    const confirmar = (id:string) => {
        if(id!==undefined)
            confirmarPedido(id).then(console.log);
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
                <InputGroup.Text> Clave Mayorista:{p.mayorista} </InputGroup.Text>
                <InputGroup.Append>
                    <Button variant="primary" onClick={()=> confirmar(id)}>Confirmar</Button>
                    <Button variant="primary" onClick={()=> onSend(p)}>Guardar</Button>
                    {pedidoEditable && pedidoEditable === p ? 
                        <Button variant="warning" onClick={(e) => {/*decoratedOnClick(e);*/setPedidoEditable(undefined)}}>Deshabilitar</Button>
                        :
                        <Button variant="success" onClick={(e) => {/*decoratedOnClick(e);*/setPedidoEditable(p)}}>Habilitar</Button>
                    }
                </InputGroup.Append>
            </InputGroup>
        );
    }

    function monstrarFilaProducto(prStock:PedidoProducto) {
        let productoCompleto = productos.find((pr:Producto)=>pr.id==prStock.id);
        if(productoCompleto===undefined) return "No existe el producto " + prStock.nombre;
        return <>
        <InputGroup.Text id="basic-addon1">
            precio minorista ({productoCompleto.precio} u)
        </InputGroup.Text>
        <InputGroup.Text id="basic-addon1">
            precio ({productoCompleto.precio * prStock.stock}) 
        </InputGroup.Text>
        </>
    }

    function modificarFilaProducto(pedido:PedidoOrdenCompra, prStock:PedidoProducto, cantidad:number) {
        let productoCompleto = productos.find((pr:Producto)=>pr.id==prStock.id);
        if(productoCompleto===undefined) return;
        let copiaPedido = pedido as OrdenCompra
        agregarProductoAPedido(copiaPedido , productoCompleto, cantidad);
        setPedidos(pedidos.map( p => p === pedido?copiaPedido:p));
    }

    //className="tarjetas_productos"
    return <>
    <Container fluid="md">
        <br />
        {DividirProductos(productos.filter(p => p.stock>0 && esProductoDeMayorista(p)), elemxFila, anchoTarjeta, agregarProducto)}
        <br />
        <Accordion>
        {pedidos.map((p:PedidoOrdenCompra, index) => (
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
                        
                        {monstrarFilaProducto(prStock)}
                        
                        <InputGroup.Append>
                            <Button variant="primary" onClick={()=> modificarFilaProducto(p, prStock, 1)}>+</Button>
                            <Button variant="primary" onClick={()=> modificarFilaProducto(p, prStock,-1)}>-</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    ))
                }
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        ) )}
        </Accordion>
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