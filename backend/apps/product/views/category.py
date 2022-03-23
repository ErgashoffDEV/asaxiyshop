from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from product.models import Category
from product.serializers.category import CategorySerializer, CategoryFilterSerializer


class CategoryListView(APIView):
    def get(self, request):
        params = CategoryFilterSerializer.check(request.GET)
        queryset = Category.objects.list(
            search=params.get('search')
        )
        serializer = CategorySerializer(queryset, many=True)
        data = pagination(queryset, serializer, params.get('page'), params.get('size'))
        return Response(data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response(serializer.data, 201)


class CategoryDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Category, id=pk)
        data = CategorySerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(Category, id=pk)
        serializer = CategorySerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(Category, id=pk)
        instance.delete()
        return Response({}, 204)
