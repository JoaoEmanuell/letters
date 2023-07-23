from random import randint
from datetime import date
from typing import Union

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from django.utils.html import escape


from .serializers import UserSerializer
from ..models import User
from .common import get_object, raise_object_dont_exist

from main.utils import generate_hash, compare_hash, generate_random_hash


class UserListApiView(APIView):
    def get(self, request, *args, **kwargs):  # Get all users, some staff
        if request.user.is_staff:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(
            {"detail": "Authentication credentials were not provided."},
            status=HTTP_401_UNAUTHORIZED,
        )

    def post(self, request, *args, **kwargs):  # Register user
        token = generate_random_hash()
        data = {
            "name": escape(request.data.get("name")),
            "username": escape(request.data.get("username")),
            "password": generate_hash(request.data.get("password")),
            "token": token,
        }

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class UserDetailApiView(APIView):
    def __hash_password(self, password: str) -> str:
        if (
            len(password) == 60 and r"$2b$08$" in password
        ):  # Verify if password is a hash
            return password
        return generate_hash(password)

    def get(self, request, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_dont_exist(User)

        serializer = UserSerializer(user_instance)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_dont_exist(User)

        optional_fields = ["name", "username", "password"]
        data = {}

        for field in optional_fields:
            value = request.data.get(field)
            if not value:
                data[field] = user_instance.__getattribute__(
                    field
                )  # Original value saved
                data[f"_{field}_data"] = user_instance.__getattribute__(field)
            else:
                data[field] = value
                data[f"_{field}_data"] = value

        # Password
        data["password"] = self.__hash_password(data["password"])

        serializer = UserSerializer(instance=user_instance, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_dont_exist(User)

        user_instance.delete()

        return Response({"res": "User deleted!"}, status=HTTP_200_OK)


class UserLoginApiView(APIView):
    def post(self, request, *args, **kwargs) -> Response:
        data = {
            "username": request.data.get("username"),
            "password": request.data.get("password"),
        }

        user_instance = get_object(User, {"username": data["username"]})
        if not user_instance:
            return raise_object_dont_exist(User)

        # Validate password
        if compare_hash(data["password"], user_instance.password):
            return Response({"res": user_instance.token}, status=HTTP_200_OK)

        return Response({"res": "Invalid password"}, status=HTTP_400_BAD_REQUEST)
