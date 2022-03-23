from django.contrib import admin
from main.models import OrderProduct


@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    fields = ('user', 'product', 'total', 'count')
