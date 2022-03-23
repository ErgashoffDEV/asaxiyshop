from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from main.models import OrderProduct
from main.serializers.order_product import OrderProductSerializer, OrderProductFilterSerializer


class OrderProductListView(APIView):
    def get(self, request):
        params = OrderProductFilterSerializer.check(request.GET)
        queryset = OrderProduct.objects.all()
        serializer = OrderProductSerializer(queryset, many=True)
        data = pagination(queryset, serializer, params.get('page'), params.get('size'))
        return Response(data)

    def post(self, request):
        serializer = OrderProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class OrderProductDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(OrderProduct, id=pk)
        data = OrderProductSerializer(instance).data
        return Response(data)

    def delete(self, request, pk):
        instance = get_object_or_404(OrderProduct, id=pk)
        instance.delete()
        return Response({}, 204)
