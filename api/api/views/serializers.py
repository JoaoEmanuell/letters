from rest_framework import serializers
from .models import UserModel, LetterModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "username", "password", "token"]


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = LetterModel
        fields = ["user_token", "date", "text_path", "sender"]
