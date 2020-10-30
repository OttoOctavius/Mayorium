from rest_framework import serializers
from .models import OrdenCompra, StockSolicitado

class StockPedidoSerializer(serializers.Serializer):
    nombre = serializers.CharField(required=True, allow_blank=True, max_length=100)
    id  =  serializers.CharField(required=True, allow_blank=False, max_length=100)
    stock  =   serializers.IntegerField(default=0)
    
    def validate(self, data):
        if data['stock'] <= 0:
            raise serializers.ValidationError('No valen stocks negativos')
        return data

    def create(self):
        validated_data = self.data
        return {
            'nombre':validated_data['nombre'],
            'id':  validated_data['id'],
            'stock':   validated_data['stock'],
        }

"""
class PedidoSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    last_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    username = serializers.CharField(required=True, allow_blank=False, max_length=100)
    contacto = serializers.CharField(required=True, allow_blank=False, max_length=30)
    email = serializers.CharField(required=True, allow_blank=False, max_length=50)
    password = serializers.CharField(required=True, allow_blank=False, max_length=50)
    nombre = models.CharField(max_length=100)
    stock = models.IntegerField(default=0)
    productos = models.ArrayField()

    def create(self, validated_data):
        return Mayorista.objects.create(**validated_data)
        #return Mayorista.crearUsuario(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.contacto = validated_data.get('contacto', instance.contacto)
        instance.save()
        return instance
"""

class PedidoSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()#source='id')
    minorista = serializers.ReadOnlyField()#source='owner')
    mayorista = serializers.ReadOnlyField()#source='owner')
    
    class Meta:
        model = OrdenCompra
        exclude=['_id']
