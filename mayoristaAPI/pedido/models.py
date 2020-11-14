from djongo import models
from bson.objectid import ObjectId
from ..mayorista.models import Mayorista
from ..producto.models import Producto

class StockPedido(models.Model):
    id = models.ObjectIdField(Producto, null=False) #si se borra este tambien
    nombre =  models.CharField(max_length=100)
    stock = models.IntegerField(default=0)

    class Meta:
        abstract = True

#Orden para minorista
class Pedido(models.Model):
    _id = models.ObjectIdField()
    
    mayorista = models.ForeignKey(Mayorista, on_delete=models.CASCADE)
    distribuidor = models.CharField(max_length=12)#models.ObjectIdField()
    readonly_fields = ('id', 'mayorista', 'distribuidor')
    #EmbeddedField
    productos = models.ArrayField(
        model_container=StockPedido,
        null=True
    )

    def getFrom(id):
        return Pedido.objects.filter(mayorista_id=ObjectId(id))
    def getById(id):
        return Pedido.objects.get(_id=ObjectId(id))

    def crearPedido(arrayStock, mayorista):
        return Pedido.objects.create(mayorista=mayorista, distribuidor="distribuidor", productos=arrayStock)
