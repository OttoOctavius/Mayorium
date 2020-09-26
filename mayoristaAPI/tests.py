#Correr con
#python manage.py test --keepdb

import datetime
from django.test import TestCase, RequestFactory
from django.utils import timezone
import mock
from unittest.mock import patch
from .models import Producto #, Mayorista, Pedido
from .productoRepo import esProductoNuevo, getAll

def foo_something_exist():
   if Producto.objects.get(a='something').exist():
      return 'exist'

class ModelMock(mock.MagicMock):
   def _get_child_mock(self, **kwargs):
      name = kwargs.get('name', '')
      if name == 'pk':
         return self.id
      return super(ModelMock,self)._get_child_mock(**kwargs)

Producto = ModelMock(spec=Producto())

class TestProductoRepo(TestCase):
   """
   Pruebas de mocks -- Hello mock
   """
   def test_crearProducto(self):
      prod = Producto()
      self.assertTrue(prod is not None)

   #@patch('Producto.objects')
   def test_getAllDeNadaEsNada(self):
      Producto.objects.return_value = []
      self.assertTrue(len(getAll())==0)

   def test_getAllCon2ProdDa2Resultados(self):
      Producto.objects.all = mock.MagicMock(return_value=[Producto(),Producto()])
      self.assertEqual(len(getAll()),2, "Se esperaban 2 resultados")

"""
def test_query(self, mock_foo):
    # just to show how to do it with longer chains
    # mock_foo.filter.return_value = mock_foo
    # mock_foo.exclude.return_value = mock_foo            
    mock_foo.get.return_value = mock_foo
    mock_foo.exists.return_value = False

    self.assertIsNone(utils.foo_something_exist()) 

@patch('utils.Foo')
def test_foo_something_exist_returns_none(self, mock_foo):
   mock_foo.objects.get.exists.return_value = False
   self.assertIsNone(utils.foo_something_exist()) 
"""