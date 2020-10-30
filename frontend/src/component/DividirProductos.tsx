import React from "react";
import { Row, Col } from "react-bootstrap";
import {ProductoMinoristaCard} from "../component/ProductoMinoristaCard";
import {ProductoMayoristaCard} from "../component/ProductoMayoristaCard";
import { Producto } from "../model/Producto";


export const DividirProductosMayorista = (elem:Producto[], elemxFila:number, anchoTarjeta:number) => {
    let filas = Math.trunc(elem.length/elemxFila)
    let resto = elem.length - filas*elemxFila;
    let matrizProductos:any = []
    for(let i = 0; i < filas; i++)
        matrizProductos.push(elem.slice(i*filas, i*filas + elemxFila ))

    if( resto > 0) matrizProductos.push(elem.slice(-resto))
    return matrizProductos.map( (fila:Producto[],i:number) => {
        return <Row>
            {fila.map( (p:Producto,j:number) => <Col key={i*elemxFila+j} xs={anchoTarjeta}> <ProductoMayoristaCard producto={p}/> </Col> )}
        </Row>
    });
}

export const DividirProductosMinorista = (elem:Producto[], elemxFila:number, anchoTarjeta:number, agregarProducto:(pr:Producto)=>void) => {
    let filas = Math.trunc(elem.length/elemxFila)
    let resto = elem.length - filas*elemxFila;
    let matrizProductos:any = []
    for(let i = 0; i < filas; i++)
        matrizProductos.push(elem.slice(i*filas, i*filas + elemxFila ))

    if( resto > 0) matrizProductos.push(elem.slice(-resto))
    return matrizProductos.map( (fila:Producto[],i:number) => {
        return <Row>
            {fila.map( (p:Producto,j:number) => <Col key={i*elemxFila+j} xs={anchoTarjeta}> <ProductoMinoristaCard producto={p} agregarProducto={agregarProducto}/> </Col> )}
        </Row>
    });
};