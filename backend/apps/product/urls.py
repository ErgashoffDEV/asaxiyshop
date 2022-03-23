from django.urls import path

from product.views.category import CategoryListView, CategoryDetailView
from product.views.product import ProductListView, ProductDetailView
from product.views.reviews import ReviewListView, ReviewDetailView

urlpatterns = [
    path('categories', CategoryListView.as_view(), name='category-list'),
    path('category/<int:pk>', CategoryDetailView.as_view(), name='category-detail'),
    path('products', ProductListView.as_view(), name='product-list'),
    path('product/<int:pk>', ProductDetailView.as_view(), name='product-detail'),
    path('review', ReviewListView.as_view(), name='review-list'),
    path('review/<int:pk>', ReviewDetailView.as_view(), name='review-detail'),
]
