from django.core.management.base import BaseCommand
from authapp.models import CustomUser


class Command(BaseCommand):
    help = 'Создает тестовых пользователей'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Указывает сколько пользователей необходимо создать')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        for i in range(total):
            CustomUser.objects.create_user(username=f'user{i}', email=f'user{i}@mail.ru', password=f'user{i}')
