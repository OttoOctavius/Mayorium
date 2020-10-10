from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse

from mayoristaAPI.models import Producto, Mayorista, VarianteProducto
from mayoristaAPI.serializers import ProductoSerializer, MayoristaSerializer

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
    productos = Producto.getAll()
    for pr in productos:
        pr.pk = str(pr.pk)
        pr.owner_id = str(pr.owner_id)
        pr.owner = None
        #pr.variantes =  serializers.serialize('json', pr.variantes)
        #print(len(pr.variantes))
    
    serializer = ProductoSerializer(productos, many=True)

    #print(serializer)
    #jsonear = JSONRenderer().render(serializer.data)
    return JSONResponse(serializer.data)
    #return HttpResponse(JSONRenderer().render(serializer.data))
#Para response: content_type="application/json",
            #status=status.HTTP_401_UNAUTHORIZED,


def productos_mayo(request, pk):
    productos = Producto.getFrom(pk)
    for pr in productos:
        pr.pk = str(pr.pk)
        pr.owner_id = str(pr.owner_id)
        pr.owner = None
        #pr.variantes =  serializers.serialize('json', pr.variantes)
        #print(len(pr.variantes))
    
    serializer = ProductoSerializer(productos, many=True)

    #print(serializer)
    #jsonear = JSONRenderer().render(serializer.data)
    return JSONResponse(serializer.data)

@api_view(['POST'])
def newproducto(request, pk):
    if request.method != 'POST':
        return HttpResponse("no deberia pasar")
    user = Mayorista.objects.get(_id=ObjectId(pk))
    request.data['owner'] = user

    request.data['variantes'] = [ VarianteProducto.nuevaVariante(variante) for variante in request.data['variantes']]
    
    serializer = ProductoSerializer(data=request.data)
    print(serializer)
    #serializer.addOwner(pk)
    print(" pre valid")
    serializer.is_valid()
    print(serializer.errors)
    serializer.is_valid(raise_exception=True) #and esProductoNuevo(serializer.validated_data["nombre"]):
    print("post valid")
    producto = serializer.save() #no debe ser create?
    producto.variantes = request.data['variantes']
    producto.owner_id = user.pk
    producto.save()
    return Response("serializer.data", status=status.HTTP_201_CREATED)
    #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    
    #pass1 = request.POST['password1']
    #pass2 = request.POST['password2']
    #if pass1 != pass2:
    #    return Response("Contraseñas no coinciden", status=status.HTTP_400_BAD_REQUEST)
    serializer = MayoristaSerializer(data=request.data) #.get("form_data")
    
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
