from django.urls import path
from mayoristaAPI.pedido.views import pedidos, newpedido, confirmarPedido, editarPedido
from mayoristaAPI.ordenescompra.views import getOrdenesCompra, confirmarOrdenCompra
import mayoristaAPI.mayorista.views as mayoristaView
import mayoristaAPI.producto.views as productoView

urlpatterns = [
    path('productos', productoView.productos, name='productos'),
    path('productos/<str:pk>', productoView.productos_mayo, name='productos_mayo'),
    path('producto/<str:pk>', productoView.newproducto, name='newproducto'),
    path('pedidos/<str:pk>', pedidos, name='pedidos'),
    path('newpedido/<str:pk>', newpedido, name='newpedido'),
    path('pedido/confirmar/<str:pk>', confirmarPedido, name='confirmarPedido'),
    path('pedido/<str:pk>', editarPedido, name='editarPedido'),
    path('ordencompra/<str:pk>', getOrdenesCompra, name='getOrdenesCompra'),
    path('ordencompra/confirmar/<str:pk>', confirmarOrdenCompra, name='confirmarOrdenCompra'),
    path('sign-up', mayoristaView.register, name='register'),
    path('sign-in', mayoristaView.getUser, name='getUser'),
]
