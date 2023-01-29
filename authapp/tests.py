from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from .views import CustomUserViewSet
from .models import CustomUser
from mixer.backend.django import mixer


class TestCustomUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'username': 'NewUser',
            'email': 'NewUser@test.com',
            'password': 'password'
        })
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'username': 'NewUser',
            'email': 'NewUser@test.com',
            'password': 'password'
        })
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        force_authenticate(request, admin)
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = CustomUser.objects.create(username='TestUser', email='testuser@test.com', password='testuser')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        user = CustomUser.objects.create(username='TestUser', email='testuser@test.com', password='testuser')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {
            'username': 'TUser',
            'email': 'tuser@test.com',
            'password': 'testuser'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = CustomUser.objects.create(username='TestUser', email='testuser@test.com', password='testuser')
        client = APIClient()
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/users/{user.id}/', {
            'username': 'TUser',
            'email': 'tuser@test.com',
            'password': 'testuser'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin_mixer(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.login(username=f'{admin.username}', password='admin')
        response = client.put(f'/api/users/{user.id}/', {
            'username': 'TUser',
            'email': 'tuser@test.com',
            'password': 'testuser'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):

    def test_get_lists(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
