from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.mayorista.models import Mayorista
from mayoristaAPI.mayorista.serializers import MayoristaSerializer

from mayoristaAPI.producto.models import VarianteProducto, Producto
from mayoristaAPI.producto.serializers import ProductoSerializer

from minoristaAPI.ordencompra.models import OrdenCompra

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response

from django.forms.models import model_to_dict


import json
from bson import ObjectId


@api_view(['GET'])
def getOrdenesCompra(request, pk):
    ordenes = OrdenCompra.objects.filter(mayorista_id=ObjectId(pk))
    for pr in ordenes:
        pr.pk = str(pr.pk)
        #pr.mayorista = str(pr.mayorista_id)
    return HttpResponse(serializers.serialize('json', ordenes))

@api_view(['GET'])
def confirmarOrdenCompra(request, pk):
    ordenCompra = OrdenCompra.getById(pk)

    if(not ordenCompra.mayorista_aprobo):
        ordenCompra.mayorista_aprobo = True
        """
        for parProductoStock in ordenCompra.productos:
            productoAfectado = Producto.getById(parProductoStock["id"])
            productoAfectado.stock -= parProductoStock["stock"]
            productoAfectado.save()
        """
        ordenCompra.save()

    return Response("ok", status=status.HTTP_200_OK)
