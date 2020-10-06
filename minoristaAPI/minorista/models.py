from djongo import models
from django.contrib.auth.models import User

class Minorista(models.Model):
    readonly_fields = ('id',)
    user = models.OneToOneField(User)
    #first_name = models.CharField(max_length=100, default="", editable=False)
    #last_name = models.CharField(max_length=100, default="", editable=False)
    #username = models.CharField(max_length=100, default="", editable=False)
    contacto = models.CharField(max_length=30, default="", editable=False)
    #email = models.CharField(max_length=50, default="", editable=False)
    #password = models.CharField(max_length=50, default="", editable=False)