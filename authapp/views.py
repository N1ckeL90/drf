from rest_framework import mixins, viewsets
from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerFull


class CustomUserViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return CustomUserModelSerializerFull
        return CustomUserModelSerializer
