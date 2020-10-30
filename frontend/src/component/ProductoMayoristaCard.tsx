import React from "react";
import { Row, Col, Button, Card, Image, CardImg } from "react-bootstrap";
import { Producto, mostrarVarianteProducto } from "../model/Producto";
import { url } from "inspector";

type ProductoMayoristaCardProps = {
    producto : Producto
    //si se pone un campo de edicion, el padre como sabe que lo esta?
}

export const ProductoMayoristaCard : React.FC<ProductoMayoristaCardProps> = (props) => {
    return <>
    <Card className="p-3 mb-2 bg-primary text-white">
        <Image src={props.producto.imagen} fluid alt="Responsive no se encuentra"/>
        <Card.Body>
            <Row>Producto: {props.producto.nombre}</Row>
            <Row>Precio: {props.producto.precio}</Row>
            <Row>Precio al publico: {props.producto.precioPublico}</Row>
            <Row>Stock: {props.producto.stock}</Row>
            <Row>Variantes:{mostrarVarianteProducto(props.producto).join(',')}</Row>
        </Card.Body>
    </Card>
    </>
}
//className="card-img-overlay"
//<Card.Img variant="top" src="https://source.unsplash.com/daily" />
//
//{props.producto.imagen.length>0 && ..imagen}
