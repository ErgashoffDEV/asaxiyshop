from rest_framework import serializers
from core.utils.serializers import ValidatorSerializer
from product.models import Product, Category
from product.serializers.category import CategorySerializer
from product.serializers.review import ReviewSerializer


class ProductSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(instance.category).data
        data['review'] = ReviewSerializer(instance.review, many=True).data
        return data

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'image',
            'brand',
            'category',
            'price',
            'review',
            'description',
        )


class ProductFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
    search = serializers.CharField(required=False)
    brand = serializers.CharField(required=False)
