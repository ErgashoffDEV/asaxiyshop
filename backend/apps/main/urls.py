from django.urls import path
from main.views.order_product import OrderProductDetailView, OrderProductListView

urlpatterns = [
    path('order_product', OrderProductListView.as_view(), name='order-product-list'),
    path('order_product/<int:pk>', OrderProductDetailView.as_view(), name='order-product-detail'),
]
