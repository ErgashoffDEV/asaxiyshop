from django.contrib import admin
from product.models import Category, Product, Review


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    fields = ('name', 'icon')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = (
        'name',
        'image',
        'brand',
        'category',
        'price',
        'description',
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    fields = ('user', 'body', 'product', 'point')
