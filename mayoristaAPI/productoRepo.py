from mayoristaAPI.models import Producto

def getAll():
    return Producto.objects.all()

def esProductoNuevo(nombre):
    if(len(nombre)>0):
        return not Producto.objects.filter(nombre=nombre).exists()
    return True
