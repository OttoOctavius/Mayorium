from djongo import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField(default=0)
    precioPublico = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    #pub_date = models.DateTimeField('date published')
    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre#{'nombre': self.nombre, 'precio': self.precio} #.to_string()
    #dict no tiene conversion, hay que usar la de JSON