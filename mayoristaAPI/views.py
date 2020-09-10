from django.shortcuts import render
from django.http import HttpResponse
from mayoristaAPI.productoRepo import getAll, esProductoNuevo

from mayoristaAPI.models import Producto
from mayoristaAPI.serializers import ProductoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
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
    #print(json.loads(request.body))
    serializer = ProductoSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid() and esProductoNuevo(serializer.validated_data["nombre"]):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
