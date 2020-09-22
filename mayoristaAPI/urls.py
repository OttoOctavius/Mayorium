from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('productos', views.productos, name='productos'),
    path('producto', views.newproducto, name='newproducto'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser'),
    #path('<int:question_id>/', views.detail, name='detail'),
]