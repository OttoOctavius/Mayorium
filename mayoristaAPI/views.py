from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers

from mayoristaAPI.productoRepo import getAll, esProductoNuevo

from mayoristaAPI.models import Producto, Mayorista, Pedido
from mayoristaAPI.serializers import ProductoSerializer, MayoristaSerializer, StockPedidoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response

def index(request):
    return HttpResponse("Hello, world.")

def productos(request):
    content = []
    for producto in getAll():
        serializer = ProductoSerializer(producto)
        content.append(serializer.data)
    return HttpResponse(JSONRenderer().render(content))

@api_view(['POST'])
def newproducto(request):
    if request.method != 'POST':
        return HttpResponse("no deberia pasar")
    serializer = ProductoSerializer(data=request.data)
    
    if serializer.is_valid() and esProductoNuevo(serializer.validated_data["nombre"]):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer.save()
        #mayorista = Mayorista.objects.create(user=serializer.validated_data)
        #mayorista.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    return HttpResponse(serializers.serialize('json', Pedido.getAll()))
    """
    #1 intento
    content = [ serializers.serialize('json',[pedido]) for pedido in Pedido.getAll() ]
    return HttpResponse(content)
    #2 intento
    content  = [ pedido for pedido in Pedido.getAll() ]
    return HttpResponse(JSONRenderer().render(**content))
    """
@api_view(['POST'])
def newpedido(request):
    acum_serial = [ StockPedidoSerializer(data=datos) for datos in request.data ]
    #transformarlo en un nuevo serializador Pedido
    creados = [ dict(stockser.create()) for stockser in acum_serial if stockser.is_valid()]
    print(creados)

    if len(creados)>0: # and all(list(map(acum_serial, lambda part: part.is_valid()))
        print("hay mas de 1 partida")
        Pedido.crearPedido(creados).save()
        
        return Response("ok", status=status.HTTP_201_CREATED)
    return Response("no", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def confirmarPedido(request):
    print(request.GET['clave'])
    return HttpResponse()


