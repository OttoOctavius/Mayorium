import React, { DetailedHTMLProps } from "react";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import { Producto } from "../model/Producto";
import { HtmlAttributes } from "csstype";

type ProductoMinoristaCardProps = {
    producto : Producto
    agregarProducto:(pr:Producto)=>void
}

export const ProductoMinoristaCard : React.FC<ProductoMinoristaCardProps> = (props) => {
    var sectionStyle = { //DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>
        //backgroundImage: `url(${props.producto.imagen})`
     } //<div styles={sectionStyle}></div>
    //<Image src={props.producto.imagen} fluid></Image>
    return <>
    
    <Card className="p-3 mb-2 bg-primary text-white">
        <Card.Body>
            
            <Row>Producto: {props.producto.nombre}</Row>
            <Row>Precio: {props.producto.precio}</Row>
            <Row>Precio al publico: {props.producto.precioPublico}</Row>
            <Row>Stock: {props.producto.stock}</Row>
            
            <Row>
                Agregar a pedido 
                <Button variant="info" type="submit" onClick={e=>props.agregarProducto(props.producto)}>+</Button>
            </Row>
        </Card.Body>
    </Card>
    </>
}
