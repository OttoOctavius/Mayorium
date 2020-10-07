from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.productoRepo import getAll, esProductoNuevo

from mayoristaAPI.models import Producto, Mayorista, Pedido
from mayoristaAPI.serializers import ProductoSerializer, MayoristaSerializer, StockPedidoSerializer
from mayoristaAPI.pedido.serializers import PedidoSerializer

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

def index(request):
    return HttpResponse("Hello, world.")

def productos(request):
    productos = getAll()
    
    for pr in productos:
        pr.pk = str(pr.pk)
        pr.owner = None
    serializer = ProductoSerializer(productos, many=True)

    #print(serializer)
    #jsonear = JSONRenderer().render(serializer.data)
    return JSONResponse(serializer.data)
    #return HttpResponse(JSONRenderer().render(serializer.data))
#Para response: content_type="application/json",
            #status=status.HTTP_401_UNAUTHORIZED,

def pr2oductos(request):
    content = []
    for producto in getAll():
        serializer = ProductoSerializer(producto)
        content.append(serializer.data)
    return HttpResponse(JSONRenderer().render(content))

@api_view(['POST'])
def newproducto(request, pk):
    if request.method != 'POST':
        return HttpResponse("no deberia pasar")
    user = Mayorista.objects.get(_id=ObjectId(pk))
    request.data['owner'] = user
    serializer = ProductoSerializer(data=request.data)
    #serializer.addOwner(pk)
    print(" pre valid")
    serializer.is_valid(raise_exception=True) #and esProductoNuevo(serializer.validated_data["nombre"]):
    print("post valid")
    serializer.save()
    return Response("serializer.data", status=status.HTTP_201_CREATED)
    #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    
    #pass1 = request.POST['password1']
    #pass2 = request.POST['password2']
    #if pass1 != pass2:
    #    return Response("Contraseñas no coinciden", status=status.HTTP_400_BAD_REQUEST)
    print(request.data)
    serializer = MayoristaSerializer(data=request.data) #.get("form_data")
    print(serializer)
    print("hola")
    
    if serializer.is_valid():
        user = serializer.save()
        user_json = serializers.serialize('json', [user])
        #mayorista = Mayorista.objects.create(user=serializer.validated_data)
        #mayorista.save()
        return Response(user_json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def getUser(request):
    #serializer = MayoristaSerializer(data=request.data)
    #serializer.is_valid()

    #if serializer.validated_data["email"] and request.data["password"]==1234:
    #username = request.data["username"]
    email_ = request.data["email"]
    password = request.data["password"]
    try:
        user = Mayorista.searchUser(email_,password)
        user.pk = str(user.pk)
        user_json = serializers.serialize('json',[user]) #,fields=('fields') , fields=('_id') o user.clave
        #print(user._id)
        return Response(user_json, status=status.HTTP_200_OK) #, content_type="text/json-comment-filtered"
    except Exception as er:
        print(er)
        return Response("Parametros incorrectos", status=status.HTTP_400_BAD_REQUEST)
    #except:
    #    return Response("Parametros incorrectos", status=status.HTTP_400_BAD_REQUEST)

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
        Pedido.crearPedido(creados, user).save()
        
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
    return HttpResponse()

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

