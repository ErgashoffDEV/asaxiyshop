from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.generics import get_object_or_404

from core.utils.serializers import BaseSerializer
from users.models import User


class SignInSerializer(BaseSerializer):
    email = serializers.EmailField(required=True, trim_whitespace=True)
    password = serializers.CharField(required=True, trim_whitespace=False)

    def validate(self, attrs):
        user = get_object_or_404(
            User,
            username=attrs.get('email').lower(),  # Using email as username.
            password=attrs.get('password')
        )

        if not user:
            msg = _('Указан неправильный логин или пароль')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
