from djongo import models
from bson.objectid import ObjectId

class Categoria(models.Model):
    #id = models.AutoField(primary_key=True)#models.IntegerField()
    id = models.ObjectIdField(null=False)
    codigo =  models.CharField(max_length=100)


class ListaCategorias(models.Model):
    #id = models.AutoField(primary_key=True)#_id = models.IntegerField()
    id = models.ObjectIdField(null=False)
    categorias = models.ArrayReferenceField(
        to=Categoria,
        on_delete=models.CASCADE,
        null=False
    )
