from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from authapp.models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    pass

