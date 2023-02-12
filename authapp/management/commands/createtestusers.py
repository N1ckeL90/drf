from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from authapp.models import CustomUser


class Command(BaseCommand):
    help = 'Создает тестовых пользователей'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Указывает сколько пользователей необходимо создать')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        for i in range(total):
            CustomUser.objects.create_user(username=get_random_string(10),
                                           first_name=f'user{i}_{get_random_string(5)}',
                                           last_name=f'user{i}_{get_random_string(5)}',
                                           email=f'user{get_random_string(5)}@mail.ru',
                                           password=f'user{i}')
