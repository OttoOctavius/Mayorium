from rest_framework import serializers
from mayoristaAPI.models import Producto


class ProductoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
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
