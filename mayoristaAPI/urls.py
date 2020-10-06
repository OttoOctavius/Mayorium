from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('productos', views.productos, name='productos'),
    path('producto/<str:pk>', views.newproducto, name='newproducto'),
    path('pedidos', views.pedidos, name='pedidos'),
    path('newpedido', views.newpedido, name='newpedido'),
    path('pedido/confirmar', views.confirmarPedido, name='confirmarPedido'),
    path('pedido/editar', views.editarPedido, name='editarPedido'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser'),
]
