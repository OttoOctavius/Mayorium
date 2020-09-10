import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Producto } from '../model/Producto';

type ProductoMayoristaCardProps = {
    producto : Producto
    //si se pone un campo de edicion, el padre como sabe que lo esta?
}

export const ProductoMayoristaCard : React.FC<ProductoMayoristaCardProps> = (props) => {
    return <>
    <Card className="p-3 mb-2 bg-primary text-white">
        <Card.Body>
            <Row>Producto: {props.producto.nombre}</Row>
            <Row>Precio: {props.producto.precio}</Row>
            <Row>Precio al publico: {props.producto.precioPublico}</Row>
            <Row>Stock: {props.producto.stock}</Row>
        </Card.Body>
    </Card>
    </>
}
