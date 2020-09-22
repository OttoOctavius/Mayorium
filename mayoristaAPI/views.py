from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

from mayoristaAPI.productoRepo import getAll, esProductoNuevo

from mayoristaAPI.models import Producto, Mayorista
from mayoristaAPI.serializers import ProductoSerializer, MayoristaSerializer
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
    if request.method != 'POST':
        return HttpResponse("no deberia pasar")
    
    serializer = MayoristaSerializer(data=request.data)
    serializer.is_valid()
    if serializer.validated_data["email"] and request.data["password"]==1234:
        user = Mayorista.search(serializer.validated_data["email"],1234)
        print(user)
        return Response(user, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
