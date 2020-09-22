from mayoristaAPI.models import Producto
from mayoristaAPI.models import Mayorista, Sede

#Asegurarse de que mongo este levantado (con mongod).

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
