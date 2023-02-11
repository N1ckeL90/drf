from rest_framework import serializers
from authapp.serializers import CustomUserModelSerializer
from .models import Project, Todo
from authapp.models import CustomUser


class ProjectModelSerializer(serializers.ModelSerializer):
    # users_involved = CustomUserModelSerializer(many=True)
    users_involved = serializers.SlugRelatedField(slug_field='username', queryset=CustomUser.objects, many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(serializers.ModelSerializer):
    project = serializers.SlugRelatedField(slug_field='name', queryset=Project.objects)
    # author = CustomUserModelSerializer()
    author = serializers.SlugRelatedField(slug_field='username', queryset=CustomUser.objects)

    class Meta:
        model = Todo
        fields = '__all__'
