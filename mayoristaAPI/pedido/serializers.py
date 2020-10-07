from rest_framework import serializers
from mayoristaAPI.models import Pedido, StockPedido


class PedidoSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()#source='id')
    mayorista = serializers.ReadOnlyField()#source='owner')

    class Meta:
        model = Pedido
        exclude=['_id', 'mayorista']
