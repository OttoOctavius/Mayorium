from djongo import models
from django.contrib.auth.models import User
from bson.objectid import ObjectId
#from django.contrib.postgres.fields import ArrayField
from ..categorias.models import Categoria
from ..mayorista.models import Mayorista #, Producto mayoristaAPI

class VarianteProducto(models.Model):
    variante =  models.CharField(max_length=100)
    stock = models.IntegerField(default=0, blank=True)
    hide = models.BooleanField(default=False)

    class Meta:
        abstract = True

    def nuevaVariante(nombre):
        return {'variante':nombre,'stock':0, 'hide':False}


class Producto(models.Model):
    _id = models.ObjectIdField()
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField(default=0)
    precioPublico = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    imagen = models.CharField(max_length=100, blank=True)
    owner = models.ForeignKey(Mayorista, on_delete=models.CASCADE)
    #categorias = models.IntegerField(default=0) #.ForeignKey(ListaCategorias, on_delete=models.CASCADE)
    """
    categorias = models.ArrayReferenceField(
        to=Categoria,
        on_delete=models.CASCADE,
        null=False
    )"""
    
    readonly_fields = ('id','owner')
    
    variantes = models.ArrayField(
        model_container=VarianteProducto,
        null=False
    )

    def getAll():
        return Producto.objects.all()
    def getFrom(id):
        return Producto.objects.filter(owner_id=ObjectId(id))
    def getById(id):
        return Producto.objects.get(_id=ObjectId(id))

    def esNuevo(nombre):
        if(len(nombre)>0):
            return not Producto.objects.filter(nombre=nombre).exists()
        return False

    def __str__(self):
        return self.nombre #+ '('+ self.id.to_string() +')'
        #{'nombre': self.nombre, 'precio': self.precio} #.to_string()
    #dict no tiene conversion, hay que usar la de JSON
