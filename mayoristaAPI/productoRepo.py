from mayoristaAPI.models import Producto

def getAll():
    return Producto.objects.all()