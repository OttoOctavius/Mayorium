from djongo import models
from bson.objectid import ObjectId
from mayoristaAPI.models import Mayorista, Producto
from minoristaAPI.minorista.models import Minorista
from django.contrib.auth.models import User

class StockSolicitado(models.Model):
    id = models.ObjectIdField(Producto, null=False) #si se borra este tambien
    nombre =  models.CharField(max_length=100)
    stock = models.IntegerField(default=0)

    class Meta:
        abstract = True

class OrdenCompra(models.Model):
    _id = models.ObjectIdField()
    minorista = models.ForeignKey(User, on_delete=models.CASCADE)
    mayorista = models.ForeignKey(Mayorista, on_delete=models.CASCADE)
    
    readonly_fields = ('id', 'minorista', 'mayorista')
    #EmbeddedField
    productos = models.ArrayField(
        model_container=StockSolicitado,
        null=True
    )

    def getFrom(id):
        return OrdenCompra.objects.filter(minorista_id=id)#ObjectId(id))
    def getById(id):
        return OrdenCompra.objects.get(_id=ObjectId(id))

    def crearOrdenCompra(arrayStock, minorista, mayorista):
        return OrdenCompra.objects.create(minorista=minorista, mayorista=mayorista, productos=arrayStock)
