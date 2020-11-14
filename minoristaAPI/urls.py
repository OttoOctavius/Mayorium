from django.urls import path

from .minorista import views
from .ordencompra import views as ordencompra

urlpatterns = [
    path('', views.index, name='index'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser'),
    path('ordencompras/<str:pk>', ordencompra.ordencompras, name='ordencompras'),
    path('newordencompra/<str:pk>', ordencompra.newordencompra, name='newordencompra'),
    path('ordencompra/confirmar/<str:pk>', ordencompra.confirmarOrdenCompra, name='confirmarOrdenCompra'),
    path('ordencompra/<str:pk>', ordencompra.editarOrdenCompra, name='editarOrdenCompra')
]