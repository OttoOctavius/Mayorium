import React, { useState, useEffect } from 'react';
import { Container, InputGroup, Button, Col } from 'react-bootstrap';
import {DividirProductosMinorista as DividirProductos} from '../component/DividirProductos';
import {getProductos} from '../api/mayorista';
import { Producto } from '../model/Producto';
import { User, cargarUsuario } from '../types/User';
import { PedidoOrdenCompra, PedidoProducto, newPedidoProducto} from "../types/Pedido";
import { sendPedido, getPedidos, confirmarPedido } from "../api/minorista";

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
    const [pedidos, setPedidos] = useState<PedidoOrdenCompra[]>([])
    const [pedidoEditable, setPedidoEditable] = useState<OrdenCompra|undefined>()

    const elemxFila = 3;
    const anchoTarjeta = 12 / elemxFila;

    useEffect( ()=>{
        getProductos().then(setProductos);
        if(cargarUsuario()!==undefined){
            getPedidos().then(setPedidos);
        }
    },[])

    const nuevoPedido = (mayorista:string) => {
        return new OrdenCompra(null, mayorista);
    }
    const agregarProducto = (pr:Producto) => {
        if(pr.owner_id === undefined || pr.owner_id == null ) return;
        let pedido = (pedidoEditable===undefined)? nuevoPedido(pr.owner_id):pedidoEditable;
        
        pedido.agregarProducto(pr,1);
        
        if(pedidoEditable===undefined)
            setPedidos([...pedidos, pedido]);
        else
            setPedidos(pedidos.map( p => p === pedidoEditable?pedido:p));
        setPedidoEditable(pedido);
    }

    function esProductoDeMayorista(pr:Producto){
        return pedidoEditable===undefined? true: pr.owner_id === pedidoEditable.mayorista;
    }

    const onSend = (pedidoAGuardar:OrdenCompra) => {
        
        sendPedido(pedidoAGuardar)
        //sendPedido(pedidos.filter( (p:any) => p.stock>0))
            .then(console.log) //, setHuboFalla).catch(setHuboFalla)
    }

    const confirmar = (id:string) => {
        if(id !==undefined)
            confirmarPedido(id).then(console.log);
    }

    //className="tarjetas_productos"
    return <>
    <Container fluid="md">
        <br />
        {DividirProductos(productos.filter(p => p.stock>0 && esProductoDeMayorista(p)), elemxFila, anchoTarjeta, agregarProducto)}
        {pedidos.map((p:any) => (
            <> 
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{p? "pedido(" + p.id + ")": ""}</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                    {Object.values(p.productos).map( (prStock:any,indice) =>(
                        <>
                        <Col>{prStock.nombre}({prStock.stock} u)</Col>
                        <Col></Col>
                        </>
                    ))
                    }
                </InputGroup.Text>
                <Button variant="primary" onClick={()=> confirmar(p.id)}>Confirmar</Button>
                <Button variant="primary" onClick={()=> sendPedido(p)}>Guardar</Button>
                {pedidoEditable && pedidoEditable === p ? 
                    <Button variant="warning" onClick={() => {setPedidoEditable(undefined)}}>Deshabilitar</Button>
                    :
                    <Button variant="success" onClick={() => {setPedidoEditable(p)}}>Habilitar</Button>
                }
            </InputGroup>
            <br />
            </>
        ) )}
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