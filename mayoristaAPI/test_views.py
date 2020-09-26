from django.test import RequestFactory, TestCase
from .models import Pedido #Producto, Mayorista, 
from . import views
import json

class ViewTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        #self.pedido = Pedido.objects.create(...)

    def test_pedidosNoFalla(self):
        request = self.factory.get('/mayorista/pedidos')
        #request.param = 
        response = views.pedidos(request)

        #Para cuando halla clases: response = MyView.as_view()(request)
        #No me interesa que viene, solo el codigo
        self.assertEqual(response.status_code, 200)


    def test_newpedidoConStock1Guarda(self):
        body = [{'nombre':'nombre','id':'id','stock':'1'}]
        request = self.factory.post(
            '/mayorista/newpedido',
            data=json.dumps(body),
            content_type='application/json')
        
        cant = len(Pedido.objects.all())
        response = views.newpedido(request)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(Pedido.objects.all())-cant,1)

    def test_newpedidoConStock0NoGuarda(self):
        body = [{'nombre':'nombre','id':'id','stock':'0'}]
        request = self.factory.post(
            '/mayorista/newpedido',
            data=json.dumps(body),
            content_type='application/json')
        
        response = views.newpedido(request)

        self.assertEqual(response.status_code, 400)
