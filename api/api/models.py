from django.db import models

# Create your models here.


class UserModel(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "users"


class LetterModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    date = models.DateField()
    text = models.CharField(max_length=5000)
    sender = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "letters"
