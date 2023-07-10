from django.db import models

# Create your models here.


class UserModel(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "users"
