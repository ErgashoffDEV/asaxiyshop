from django.db.models import Q

from core.querysets.base_queryset import BaseQuerySet


class ProductQuerySet(BaseQuerySet):
    def list(self, category=None, search=None, brand=None):
        query = self.filter(category=category) if category else self
        query = query.filter(Q(name__icontains=search) | Q(brand__icontains=search) | Q(description__icontains=search))\
            if search else query
        query = query.filter(brand=brand) if brand else query
        return query.order_by('id')
