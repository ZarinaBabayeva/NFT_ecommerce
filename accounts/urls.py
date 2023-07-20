from django.urls import path
from .views import *

app_name= "accounts"

urlpatterns = [
    path("login/" , LoginView.as_view() , name="login"),
    path("register/" , RegisterView.as_view() , name="register"),
    path("users_list/" , UsersListView.as_view() , name="users-list"),
    path('user/', UserView.as_view(), name='user'),
]
