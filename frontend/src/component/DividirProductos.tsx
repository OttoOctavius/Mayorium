import React from "react";
import { Row, Col } from "react-bootstrap";
import {ProductoMinoristaCard as TarjetaProducto} from "../component/ProductoMinoristaCard";
import { Producto } from "../model/Producto";

const DividirProductos = (elem:Producto[], elemxFila:number, anchoTarjeta:number) => {
    let filas = Math.trunc(elem.length/elemxFila)
    let resto = elem.length - filas*elemxFila;
    let matrizProductos:any = []

    for(let i = 0; i < filas; i++)
        matrizProductos.push(elem.slice(i*filas, elemxFila ))

    if( resto > 0) matrizProductos.push(elem.slice(-resto))

    return matrizProductos.map( (fila:Producto[],i:number) => {
        return <Row>
            {fila.map( (p:Producto,j:number) => <Col key={i*elemxFila+j} xs={anchoTarjeta}> <TarjetaProducto producto={p}/> </Col> )}
        </Row>
    });
}

export default DividirProductos;