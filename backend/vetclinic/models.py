from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    # delete username field and use email as the PK instead
    username = None
    email = models.EmailField(unique=True)
    # the model contains the rest of default fields
    # https://docs.djangoproject.com/en/4.0/ref/contrib/auth/#django.contrib.auth.models.User
    # is_staff GIVES ACCESS TO ADMIN PANEL IT IS NOT THE SAME AS is_doctor
    is_doctor = models.BooleanField(default=False)

    # treat email as username field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# dummy animal model, extend later
class Animal(models.Model):
    name = models.CharField(max_length=150)


class Visit(models.Model):
    date = models.DateTimeField()
    doctor_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    animal_id = models.ForeignKey(Animal, on_delete=models.CASCADE, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
