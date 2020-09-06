from djongo import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField(default=0)
    precioPublico = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    #pub_date = models.DateTimeField('date published')
    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
