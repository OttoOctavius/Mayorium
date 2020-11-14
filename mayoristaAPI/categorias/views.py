from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.models import Mayorista, Producto

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
