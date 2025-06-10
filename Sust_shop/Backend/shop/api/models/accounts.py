from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

USER_TYPE_CHOICES = (
    ('seller', 'Seller'),
    ('user', 'Normal User'),
    ('admin', 'Admin'),
)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone_number, password=None, user_type='user', **extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not phone_number:
            raise ValueError('Phone number is required')
        if user_type not in ['seller', 'user']:
            # To prevent user creation as admin from public endpoints
            user_type = 'user'
        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # Superuser is allowed to create an admin account or themselves
        user = self.model(email=email, phone_number=phone_number, user_type='admin', **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']  # Only phone number is required additionally

    def __str__(self):
        return self.email