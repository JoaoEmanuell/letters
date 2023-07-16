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

from .serializers import UserSerializer
from ..models import User

from main.utils import generate_hash, compare_hash


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
        token = generate_hash(f"{randint(1, 100000000)}{date.today()}")
        token = token.replace("/", "").replace(".", "")
        data = {
            "name": request.data.get("name"),
            "username": request.data.get("username"),
            "password": generate_hash(request.data.get("password")),
            "token": token,
        }

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class UserDetailApiView(APIView):
    def __get_object(self, token: str) -> Union[User, None]:
        try:
            return User.objects.get(token=token)
        except User.DoesNotExist:
            return None

    def __user_dont_exists(self) -> Response:
        return Response({"res": "User don't exists"}, status=HTTP_400_BAD_REQUEST)

    def __hash_password(self, password: str) -> str:
        if (
            len(password) == 60 and r"$2b$08$" in password
        ):  # Verify if password is a hash
            return password
        return generate_hash(password)

    def get(self, request, token, *args, **kwargs) -> Response:
        user_instance = self.__get_object(token)
        if not user_instance:
            return self.__user_dont_exists()

        serializer = UserSerializer(user_instance)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, token, *args, **kwargs) -> Response:
        user_instance = self.__get_object(token)
        if not user_instance:
            return self.__user_dont_exists()

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
        user_instance = self.__get_object(token)
        if not user_instance:
            return self.__user_dont_exists()

        user_instance.delete()

        return Response({"res": "User deleted!"}, status=HTTP_200_OK)


class UserLoginApiView(APIView):
    def __get_object(self, username: str) -> Union[User, None]:
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def __user_dont_exists(self) -> Response:
        return Response({"res": "User don't exists"}, status=HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs) -> Response:
        data = {
            "username": request.data.get("username"),
            "password": request.data.get("password"),
        }

        user_instance = self.__get_object(data["username"])
        if not user_instance:
            return self.__user_dont_exists()

        # Validate password
        if compare_hash(data["password"], user_instance.password):
            return Response({"res": user_instance.token}, status=HTTP_200_OK)

        return Response({"res": "Invalid password"}, status=HTTP_400_BAD_REQUEST)
