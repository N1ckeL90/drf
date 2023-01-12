from django.db import models
from authapp.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=256)
    link_repo = models.URLField()
    users_involved = models.ManyToManyField(CustomUser)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note_text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
