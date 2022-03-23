from django.db.models import Q

from core.querysets.base_queryset import BaseQuerySet


class ReviewQuerySet(BaseQuerySet):
    def list(self, user=None):
        query = self.filter(user=user) if user else self
        return query.order_by('id')
