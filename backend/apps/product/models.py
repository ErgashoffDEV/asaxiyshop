from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import CASCADE
from core.models import BaseModel
from product.querysets.category import CategoryQuerySet
from product.querysets.product import ProductQuerySet


class Category(BaseModel):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='categories')

    objects = CategoryQuerySet.as_manager()

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=255)
    category = models.ForeignKey('product.Category', CASCADE, 'categories')
    brand = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products', null=True, blank=True)
    price = models.IntegerField(default=0)
    description = models.TextField()

    objects = ProductQuerySet.as_manager()

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey('users.User', CASCADE)
    body = models.TextField()
    product = models.ForeignKey('product.Product', CASCADE, null=True, related_name='review')
    point = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )

    def __str__(self):
        return str(self.point)
