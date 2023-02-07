import graphene
from graphene_django import DjangoObjectType
from authapp.models import CustomUser
from todoapp.models import Project, Todo


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
        )


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    # all_custom_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)

    # def resolve_all_custom_users(self, info):
    #     return CustomUser.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todo(self, info):
        return Todo.objects.all()


schema = graphene.Schema(query=Query)
