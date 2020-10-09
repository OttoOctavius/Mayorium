from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from minoristaAPI.minorista.serializers import UserSerializer, MinoristaSerializer

def index(request):
    return HttpResponse("Hello, world.")

@api_view(['POST'])
def register(request):
    dataSinContacto = request.data
    del dataSinContacto['contacto']

    serializer = MinoristaSerializer(data=dataSinContacto) #.get("form_data")
    #serializer.initial_data.pop('contacto')
    print(serializer)
    
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
        user = User.objects.get(email=email_)
        user_json = serializers.serialize('json',[user]) #,fields=('fields') , fields=('_id') o user.clave
        #print(user._id)
        return Response(user_json, status=status.HTTP_200_OK) #, content_type="text/json-comment-filtered"
    except Exception as er:
        print(er)
        return Response("Parametros incorrectos", status=status.HTTP_400_BAD_REQUEST)
    #except:
    #    return Response("Parametros incorrectos", status=status.HTTP_400_BAD_REQUEST)
