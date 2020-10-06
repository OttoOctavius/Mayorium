from mayoristaAPI.models import Producto
from mayoristaAPI.models import Mayorista, Sede

#Asegurarse de que mongo este levantado (con mongod).
"""
from mayoristaAPI.models import Producto
from mayoristaAPI.models import Mayorista, Sede
from mayoristaAPI.serializers import ProductoSerializer, MayoristaSerializer, StockPedidoSerializer
from bson.objectid import ObjectId
id='5f6a717bd51515b8952c9019'
mayo = Mayorista.objects.get(_id=ObjectId(id))
ser = ProductoSerializer(data={'nombre':'3wqdo','stock' : 20, 'precio' : 50, 'precioPublico' : 70,'imagen':'','owner':mayo.pk})
"""

mayo = Mayorista(nombre= "Elven Dedor",contacto = "12345678")
sede = Sede(ubicacion = "Lejos") #sede = Sede.objects.all()[0]
sede.save()

mayo.sede = {"ubicacion" : "Lejos", "_id":""}
mayo.save()
sede


durazno = Producto(nombre='Lata Durazno', stock = 20, precio = 50, precioPublico = 70)
durazno.save()

palmito = Producto(nombre='Lata Palmito', stock = 30, precio = 40, precioPublico = 50)
palmito.save()

choclo = Producto(nombre='Lata Choclo', stock = 40, precio = 30, precioPublico = 50)
choclo.save()
