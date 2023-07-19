from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyUserManager(BaseUserManager):
    def create_user(
        self, username, password, is_active=True, is_staff=False, is_superuser=False
    ):
        user = self.model(username=username)
        user.set_password(password)
        user.is_active = is_active
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(username=username, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.user_type = "owner"
        user.save(using=self._db)
        return user

def upload_avatar(instance, filename):
    return f"users/{instance.username}/{filename}"

class MyUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ( 'artist', 'Artist'),
        ( 'buyer', 'Buyer'),
    ]
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    username = models.CharField(unique=True, max_length=255)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=300)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES, default='buyer')
    avatar = models.ImageField(upload_to=upload_avatar)
    gender = models.CharField(max_length=20 , choices=GENDER_CHOICES, default='other')
    bio = models.TextField(max_length=2000)
    walletAddress = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "username"

    def has_module_perms(self, app_label):
        return self.is_superuser

    class Meta:
        ordering = ['-created_at']
        verbose_name = "MyUser"
        verbose_name_plural = "MyUsers"

    def __str__(self):
        return self.username
    
    def has_perm(self,perm,obj=None):
        return self.is_superuser






