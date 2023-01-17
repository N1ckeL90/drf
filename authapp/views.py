from rest_framework.pagination import LimitOffsetPagination
from rest_framework import mixins, viewsets
from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


class CustomUserViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserLimitOffsetPagination
