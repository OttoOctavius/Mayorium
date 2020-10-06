from django.urls import path

from .minorista import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign-up', views.register, name='register'),
    path('sign-in', views.getUser, name='getUser')
]