from djongo import models
from django.contrib.auth.models import User
#from django.contrib.postgres.fields import ArrayField

class Partida(models.Model):
    producto = models.IntegerField(default=0)
    
    stock = models.IntegerField(default=0)
    #pub_date = models.DateTimeField('date published')
    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre#{'nombre': self.nombre, 'precio': self.precio} #.to_string()
    #dict no tiene conversion, hay que usar la de JSON

def sinSedes():
    return {}

class Sede(models.Model):
    #_id = models.ObjectIdField()
    ubicacion = models.CharField(max_length=100)
    #stock = [models.EmbeddedField(model_container=Partida)]

class Mayorista(models.Model):
    first_name = models.CharField(max_length=100, default="", editable=False)
    last_name = models.CharField(max_length=100, default="", editable=False)
    username = models.CharField(max_length=100, default="", editable=False)
    contacto = models.CharField(max_length=30, default="", editable=False)
    email = models.CharField(max_length=50, default="", editable=False)
    password = models.CharField(max_length=50, default="", editable=False)
    compraMinima = models.IntegerField(blank=True)
    compraMaxima = models.IntegerField(blank=True)
    """
    @property
    def clave(self):
        return self.id
    
    sede = models.ArrayReferenceField(
        to=Sede,
        on_delete=models.CASCADE,
    )
    """
    #profile = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    def crearUsuario(user):
        user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
        """
        return Mayorista.objects.create(
            nombre  =user["username"],#user.first_name + user.last_name,
            contacto=user["contacto"],
            email   =user["email"],
            compraMinima=0,
            compraMaxima=0,
            sede = []
            )"""

    #Repositorio
    """
    Busca si existe el username con la pass
    PreCondicion: Estan sanitizada
    """
    def searchUser(mail,password):
        return Mayorista.objects.get(email=mail)
    def __str__(self):
        return self.username

"""
class Dicty(models.Model):
    name      = models.CharField(max_length=50)

class KeyVal(models.Model):
    container = models.ForeignKey(Dicty, db_index=True)
    key       = models.CharField(max_length=240, db_index=True)
    value     = models.CharField(max_length=240, db_index=True)
"""


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField(default=0)
    precioPublico = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    imagen = models.CharField(max_length=100, blank=True)
    #pub_date = models.DateTimeField('date published')
    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre#{'nombre': self.nombre, 'precio': self.precio} #.to_string()
    #dict no tiene conversion, hay que usar la de JSON
