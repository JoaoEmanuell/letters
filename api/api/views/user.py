from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)

from django.utils.html import escape
from django.http import HttpRequest

from .serializers import UserSerializer
from ..models import User
from .common import (
    get_object,
    raise_object_dont_exist,
    optional_fields,
    format_return_data,
    staff_get_all,
)

from main.utils import generate_hash, compare_hash, generate_random_hash


class UserListApiView(APIView):
    def get(self, request, *args, **kwargs):  # Get all users, some staff
        return staff_get_all(request, User, UserSerializer)

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
            return Response(
                {"token": serializer.data["token"]}, status=HTTP_201_CREATED
            )
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
        data = format_return_data(serializer.data, exclude_fields=["token", "password"])
        return Response(data, status=HTTP_200_OK)

    def put(self, request, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_dont_exist(User)

        data = optional_fields(
            user_instance, request.data, ["name", "username", "password"]
        )

        # Password
        data["password"] = self.__hash_password(data["password"])

        serializer = UserSerializer(instance=user_instance, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            data = format_return_data(
                serializer.data, exclude_fields=["token", "password"]
            )
            return Response(data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request: HttpRequest, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_dont_exist(User)

        # Delete letters
        from requests import delete

        url = request.build_absolute_uri("/api/letter/user/")  # Url to request
        data = {"username": user_instance.username, "token": token}
        delete(url=url, data=data)

        # Delete user

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
            return Response({"token": user_instance.token}, status=HTTP_200_OK)

        return Response({"res": "Invalid password"}, status=HTTP_400_BAD_REQUEST)
