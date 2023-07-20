from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import *

User = get_user_model()

class LoginView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UsersListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsersListSerializer

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsersListSerializer
    permission_classes = [IsAuthenticated]