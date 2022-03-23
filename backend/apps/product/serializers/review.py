from rest_framework import serializers
from core.utils.serializers import ValidatorSerializer
from product.models import Review
from users.serializers.users import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data

    class Meta:
        model = Review
        fields = ('user', 'body', 'product', 'point')


class ReviewFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
