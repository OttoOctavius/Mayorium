from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('productos', views.productos, name='productos'),
    path('producto/<str:pk>', views.newproducto, name='newproducto'),
    path('pedidos', views.pedidos, name='pedidos'),
    path('newpedido/<str:pk>', views.newpedido, name='newpedido'),
    path('pedido/confirmar/<str:pk>', views.confirmarPedido, name='confirmarPedido'),
    path('pedido/<str:pk>', views.editarPedido, name='editarPedido'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser'),
]
