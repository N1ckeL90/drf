from rest_framework.serializers import ModelSerializer
from authapp.serializers import CustomUserModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users_involved = CustomUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    author = CustomUserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
