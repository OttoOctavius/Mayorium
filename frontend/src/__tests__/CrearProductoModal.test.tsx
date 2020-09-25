import React, { useEffect, useState } from "react";
import { render, fireEvent, screen, getByLabelText } from "@testing-library/react";
import { act } from "react-dom/test-utils";

//import { mocked } from "ts-jest/utils"
import CrearProductoModal from "../component/CrearProductoModal";
import { newProducto, Producto } from "../model/Producto";
import * as mayorista from "../api/mayorista";

jest.mock("../api/mayorista");
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

  test("Tocar boton Crear activa evento crear el modal", async () => {

    const props = { onHide:onHideEvent, show:true};
    const {getByTestId} = render(<CrearProductoModal {...props} />);
    const botonCerrar = getByTestId("Crear");
    
    await act( async () => {
      await fireEvent.click(botonCerrar);
    });

    //expect(mock_onHide).toHaveBeenCalled();
  });
});
