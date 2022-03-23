from rest_framework import serializers
from core.utils.serializers import ValidatorSerializer
from main.models import OrderProduct
from product.serializers.product import ProductSerializer


class OrderProductSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['product'] = ProductSerializer(instance.product).data
        return data

    class Meta:
        model = OrderProduct
        fields = ('id', 'user', 'product', 'total', 'count', 'name', 'address', 'phone')


class OrderProductFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
