from core.querysets.base_queryset import BaseQuerySet


class OrderProductQuerySet(BaseQuerySet):
    def list(self, order):
        query = self.filter(order=order)
        return query
