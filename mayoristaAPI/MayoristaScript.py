from mayoristaAPI.models import Producto

#Asegurarse de que mongo este levantado (con mongod).

durazno = Producto(nombre='Lata Durazno', stock = 20, precio = 50, precioPublico = 70)
durazno.save()

palmito = Producto(nombre='Lata Palmito', stock = 30, precio = 40, precioPublico = 50)
palmito.save()

choclo = Producto(nombre='Lata Choclo', stock = 40, precio = 30, precioPublico = 50)
choclo.save()
