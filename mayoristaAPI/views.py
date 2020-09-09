from django.shortcuts import render
from django.http import HttpResponse
from mayoristaAPI.productoRepo import getAll

from mayoristaAPI.models import Producto
from mayoristaAPI.serializers import ProductoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


def index(request):
    return HttpResponse("Hello, world.")

def productos(request):
    content = []
    for producto in getAll():
        serializer = ProductoSerializer(producto)
        content.append(serializer.data)
    return HttpResponse(JSONRenderer().render(content))