from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.models import Mayorista
from mayoristaAPI.pedido.models import Pedido, Producto
from mayoristaAPI.pedido.serializers import StockPedidoSerializer, PedidoSerializer

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
def pedidos(request):
    pedidos = Pedido.getAll()
    for pr in pedidos:
        pr.pk = str(pr.pk)
        pr.mayorista = None
    #serializer = PedidoSerializer(pedidos, many=True)
    #print(pedidos)
    #print(serializer)
    #jsonear = JSONRenderer().render(serializer.data)
    return HttpResponse(serializers.serialize('json', pedidos))
    #return JSONResponse(serializers.serialize('json', Pedido.getAll())) #HttpResponse
    """
    #1 intento
    content = [ serializers.serialize('json',[pedido]) for pedido in Pedido.getAll() ]
    return HttpResponse(content)
    #2 intento
    content  = [ pedido for pedido in Pedido.getAll() ]
    return HttpResponse(JSONRenderer().render(**content))
    """
@api_view(['POST'])
def newpedido(request, pk):
    acum_serial = [ StockPedidoSerializer(data=datos) for datos in request.data ]
    print(acum_serial)
    #transformarlo en un nuevo serializador Pedido
    creados = [ dict(stockser.create()) for stockser in acum_serial if stockser.is_valid()]
    print(creados)

    if len(creados)>0: # and all(list(map(acum_serial, lambda part: part.is_valid()))
        print("hay mas de 1 partida")
        user = Mayorista.objects.get(_id=ObjectId(pk))
        Pedido.crearPedido(creados, user)#.save()
        
        return Response("ok", status=status.HTTP_201_CREATED)
    return Response("no", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def confirmarPedido(request, pk):
    pedido = Pedido.getById(pk)
    print(pedido)
    #mayorista = Mayorista.searchByObjectId(pedido.mayorista_id)
    for parProductoStock in pedido.productos:
        productoAfectado = Producto.getById(parProductoStock["id"])
        productoAfectado.stock += parProductoStock["stock"]
        productoAfectado.save()
    pedido.delete()
    #productosAfectados = Producto.objects.filter(owner_id=pedido.mayorista_id)
    
    #print(productosAfectados)
    #print(mayorista)
    return Response("ok", status=status.HTTP_200_OK)

#deberia ser PATCH
@api_view(['PUT'])
def editarPedido(request, pk):
    print("-----------------------")
    acum_serial = [ StockPedidoSerializer(data=datos) for datos in request.data ]
    #transformarlo en un nuevo serializador Pedido
    creados = [ dict(stockser.create()) for stockser in acum_serial if stockser.is_valid()]
    print(creados)

    if len(creados)>0: # and all(list(map(acum_serial, lambda part: part.is_valid()))
        #modificar el pedido
        pedidoAnterior = Pedido.objects.get(_id=ObjectId(pk))
        pedidoAnterior.productos = creados
        pedidoAnterior.save()
        return Response("ok", status=status.HTTP_200_OK)
    return Response("Esta vacio", status=status.HTTP_400_BAD_REQUEST)
    #return HttpResponse()
