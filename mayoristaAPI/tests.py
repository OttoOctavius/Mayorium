import datetime
from django.test import TestCase, RequestFactory
from django.utils import timezone
import mock
from unittest.mock import patch

#import utils
from .models import Producto
def foo_something_exist():
   if Foo.objects.get(a='something').exist():
      return 'exist'



# test.py


@patch('utils.Foo.objects')
def test_foo_something_exist_returns_none(self, mock_foo):
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
