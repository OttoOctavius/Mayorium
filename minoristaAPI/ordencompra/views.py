from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.mayorista.models import Mayorista
from mayoristaAPI.producto.models import Producto

from minoristaAPI.minorista.models import Minorista
from minoristaAPI.ordencompra.models import OrdenCompra
from minoristaAPI.ordencompra.serializers import StockSolicitado, PedidoSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response


from django.forms.models import model_to_dict


import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
#JSONEncoder().encode(productos)

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

#@api_view(['GET'])
def ordencompras(request, pk):
    ordencompras = OrdenCompra.getFrom(pk)
    for pr in ordencompras:
        pr.pk = str(pr.pk)
        #pr.mayorista = str(pr.mayorista_id)
    return HttpResponse(serializers.serialize('json', ordencompras))

@api_view(['POST'])
def newordencompra(request, pk):
    pedidoOrden = PedidoSerializer(data=request.data)
    if pedidoOrden.is_valid():
        print(pedidoOrden)
        mayorista = Mayorista.objects.get(_id=ObjectId(request.data['mayorista']))#pedidoOrden.validate_mayorista))
        minorista = User.objects.get(pk=request.data['minorista'])#pedidoOrden.validate_minorista)
        
        #OrdenCompra.crearOrdenCompra(pedidoOrden)#.save()
        nuevoPedido = pedidoOrden.save()
        nuevoPedido.mayorista_id = mayorista.pk
        nuevoPedido.minorista_id = minorista.pk
        nuevoPedido.save()
        return Response(str(nuevoPedido.pk), status=status.HTTP_201_CREATED)
    return Response("no", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def confirmarOrdenCompra(request, pk):
    ordencompra = OrdenCompra.getById(pk)
    print(ordencompra)
    #mayorista = Mayorista.searchByObjectId(ordencompra.mayorista_id)
    if(not ordencompra.mayorista_aprobo):
        return Response("Falta aprovacion mayorista", status=status.HTTP_400_BAD_REQUEST)

    for parProductoStock in ordencompra.productos:
        productoAfectado = Producto.getById(parProductoStock["id"])
        productoAfectado.stock -= parProductoStock["stock"]
        productoAfectado.save()
    ordencompra.delete()
    
    return Response("ok", status=status.HTTP_200_OK)

@api_view(['PATCH'])
def editarOrdenCompra(request, pk):
    print("-----------------------")
    pedidoOrden = PedidoSerializer(data=request.data)
    ordencompraAnterior = OrdenCompra.getById(request.data['id'])

    if pedidoOrden.is_valid() and ordencompraAnterior._id != None: #comprobar clave
        #pedidoOrden.update()
        ordencompraAnterior.productos = pedidoOrden.validated_data['productos']
        ordencompraAnterior.save()
        return Response("ok", status=status.HTTP_200_OK)
    return Response("Esta vacio", status=status.HTTP_400_BAD_REQUEST)
