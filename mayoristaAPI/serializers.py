from rest_framework import serializers
from mayoristaAPI.models import Producto, Mayorista

#str(durazno.pk)
"""
    def restore_object(self, attrs, instance=None):
        if instance:
            instance.pk = str(attrs.get('pk', instance.pk))
            return instance
        return Producto(**attrs)
"""

class ProductoSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='pk')
    owner = serializers.ReadOnlyField()#source='owner')

    class Meta:
        model = Producto
        exclude=['_id']
    
    def addOwner(self, id):
        #user = Mayorista.objects.get(pk=id)
        #print(user.id)
        self.raw_data.owner = id#user.id

    def create(self, validated_data):
        return Producto.objects.create(**validated_data)
    #mirar ser.errors si falla!

    def validate(self, data):
        print('validating')
        if not Producto.esNuevo(data['nombre']):
            raise serializers.ValidationError('Nombre corto o existente')
        if data['stock'] <= 0:
            raise serializers.ValidationError('No valen stocks negativos')
        print('ok')
        return data
    def validate_owner(self, owner_id):
        return owner_id




class Pr3oductoSerializer(serializers.Serializer):
    #_l
    nombre = serializers.CharField(required=True, allow_blank=False, max_length=100)
    precio = serializers.IntegerField(default=0)
    precioPublico = serializers.IntegerField(default=0)
    stock = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return Producto.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.precio = validated_data.get('precio', instance.precio)
        instance.precioPublico = validated_data.get('precioPublico', instance.precioPublico)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.save()
        return instance

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


class PartidaSerializer(serializers.Serializer):
    producto = serializers.CharField(required=True, allow_blank=True, max_length=100)
    nombre  =  serializers.CharField(required=True, allow_blank=False, max_length=100)
    stock  =   serializers.IntegerField(default=0)
    
    def validate(self, data):
        if data['stock'] <= 0:
            raise serializers.ValidationError('No valen stocks negativos')
        return data

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