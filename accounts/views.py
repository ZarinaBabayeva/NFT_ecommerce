from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework.response import Response
from .models import MyUser

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

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UsersListSerializer

class FollowUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        try:
            current_user = request.user  
            target_user = get_object_or_404(MyUser, id=user_id) 

            if current_user == target_user:
                return Response({"message": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

            current_user.following.add(target_user) 

            return Response({"message": f"You have successfully followed {target_user.username}."}, status=status.HTTP_200_OK)

        except MyUser.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id):
        try:
            current_user = request.user 
            target_user = get_object_or_404(MyUser, id=user_id) 

            current_user.following.remove(target_user) 

            return Response({"message": f"You have successfully unfollowed {target_user.username}."}, status=status.HTTP_200_OK)

        except MyUser.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)