from rest_framework import serializers
from mayoristaAPI.mayorista.models import Mayorista

class MayoristaSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField(source='pk')
    first_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    last_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    username = serializers.CharField(required=True, allow_blank=False, max_length=100)
    contacto = serializers.CharField(required=True, allow_blank=False, max_length=30)
    email = serializers.CharField(required=True, allow_blank=False, max_length=50)
    password = serializers.CharField(required=True, allow_blank=False, max_length=50)

    def create(self, validated_data):
        return Mayorista.objects.create(**validated_data)
        #return Mayorista.crearUsuario(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.contacto = validated_data.get('contacto', instance.contacto)
        instance.save()
        return instance
