from django.db import models
from django.db.models import CASCADE

from main.querysets.order_product import OrderProductQuerySet


class OrderProduct(models.Model):
    name = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True)
    user = models.ForeignKey('users.User', CASCADE)
    product = models.ForeignKey('product.Product', CASCADE)
    total = models.IntegerField()
    count = models.IntegerField()
    objects = OrderProductQuerySet.as_manager()

    def __str__(self):
        return str(self.user)
