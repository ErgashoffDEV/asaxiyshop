from rest_framework import serializers
from core.utils.serializers import ValidatorSerializer
from product.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'icon')


class CategoryFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
    search = serializers.CharField(required=False)
