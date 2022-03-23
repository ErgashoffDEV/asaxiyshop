from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from product.models import Product
from product.serializers.product import ProductSerializer, ProductFilterSerializer


class ProductListView(APIView):
    def get(self, request):
        params = ProductFilterSerializer.check(request.GET)
        queryset = Product.objects.list(
            category=params.get('category'),
            search=params.get('search'),
            brand=params.get('brand')
        )
        serializer = ProductSerializer(queryset, many=True)
        data = pagination(queryset, serializer, params.get('page'), params.get('size'))
        return Response(data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response(serializer.data, 201)


class ProductDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Product, id=pk)
        data = ProductSerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(Product, id=pk)
        serializer = ProductSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(Product, id=pk)
        instance.delete()
        return Response({}, 204)
