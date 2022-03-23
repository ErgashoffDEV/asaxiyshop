from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from product.models import Review
from product.serializers.review import ReviewSerializer, ReviewFilterSerializer


class ReviewListView(APIView):
    def get(self, request):
        params = ReviewFilterSerializer.check(request.GET)
        queryset = Review.objects.all()
        serializer = ReviewSerializer(queryset, many=True)
        data = pagination(queryset, serializer, params.get('page'), params.get('size'))
        return Response(data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class ReviewDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Review, id=pk)
        data = ReviewSerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(Review, id=pk)
        serializer = ReviewSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(Review, id=pk)
        instance.delete()
        return Response({}, 204)

