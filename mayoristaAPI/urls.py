from django.urls import path
from mayoristaAPI.pedido.views import pedidos, newpedido, confirmarPedido, editarPedido
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('productos', views.productos, name='productos'),
    path('producto/<str:pk>', views.newproducto, name='newproducto'),
    path('pedidos', pedidos, name='pedidos'),
    path('newpedido/<str:pk>', newpedido, name='newpedido'),
    path('pedido/confirmar/<str:pk>', confirmarPedido, name='confirmarPedido'),
    path('pedido/<str:pk>', editarPedido, name='editarPedido'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser'),
]
