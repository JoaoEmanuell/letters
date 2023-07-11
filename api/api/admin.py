from django.contrib import admin

# Register your models here.
from .models import UserModel, LetterModel

admin.site.register(UserModel)
admin.site.register(LetterModel)
