from rest_framework import mixins, viewsets
from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
