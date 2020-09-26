import React, { useEffect, useState } from "react";
import { render, fireEvent, screen, getByLabelText } from "@testing-library/react";
import { act } from "react-dom/test-utils";

//import { mocked } from "ts-jest/utils"
import CrearProductoModal from "../component/CrearProductoModal";
import { newProducto, Producto } from "../model/Producto";
import * as mayorista from "../api/mayorista";
//import {sendProducto} from "../api/mayorista";

//jest.mock("../api/mayorista");
const sendProducto = jest.spyOn(mayorista, "sendProducto");

//Mas usadas: mockImplementationOnce, mockResolvedValueOnce, mockRejectedValueOnce
const promesaTHENDa  = (msj:string) => jest.fn().mockResolvedValueOnce(msj);
const promesaCATCHDa = (msj:string) => jest.fn().mockRejectedValue(new Error(msj));

const onHideEvent = jest.fn();
const onSendEvent = jest.fn();

describe("<CrearProductoModal />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Tocar boton Cerrar activa evento cerrar el modal", async () => {
    const mock_onHide = jest.fn();
    const props = { onHide:mock_onHide, show:true};
    const {getByTestId} = render(<CrearProductoModal {...props} />);
    const botonCerrar = getByTestId("Cerrar");
    
    await act( async () => {
      await fireEvent.click(botonCerrar);
    });

    expect(mock_onHide).toHaveBeenCalled();
  });

  test("Tocar boton Crear sin nombre no activa evento crear del modal", async () => {

    const props = { onHide:onHideEvent, show:true, onSuccess:onSendEvent};
    const {getByTestId} = render(<CrearProductoModal {...props} />);
    const botonCrear = getByTestId("Crear");
    
    await act( async () => {
      await fireEvent.change(getByTestId("nombre"), {target: {value:""}});
      await fireEvent.change(getByTestId("precio"), {target: {value:1}});
      await fireEvent.change(getByTestId("precio-publico"), {target: {value:1}});
      await fireEvent.change(getByTestId("stock"), {target: {value:1}});
      await fireEvent.click(botonCrear);
    });

    expect(onSendEvent).toHaveBeenCalledTimes(0);
  });

  test("Tocar boton Crear con nombre activa evento crear del modal", async () => {

    const props = { onHide:onHideEvent, show:true, onSuccess:onSendEvent};
    const {getByTestId} = render(<CrearProductoModal {...props} />);
    const botonCrear = getByTestId("Crear");

    await act( async () => {
      await fireEvent.change(getByTestId("nombre"), {target: {value:"aaa"}});
      await fireEvent.change(getByTestId("precio"), {target: {value:1}});
      await fireEvent.change(getByTestId("precio-publico"), {target: {value:1}});
      await fireEvent.change(getByTestId("stock"), {target: {value:1}});
      await fireEvent.click(botonCrear);
    });

    sendProducto.mockResolvedValueOnce(promesaTHENDa("ok"))
    expect(sendProducto).toHaveBeenCalled();
  });
});
