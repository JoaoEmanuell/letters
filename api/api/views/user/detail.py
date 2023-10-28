from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)

from django.utils.html import escape
from django.http import HttpRequest

from ..serializers import UserSerializer, LetterSerializer
from ...models import User, Letter
from ..common import (
    get_object,
    raise_object_not_exist,
    optional_fields,
    format_return_data,
)

from main.utils import generate_hash
from main.cache_manager import cache_manager_singleton


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
            return raise_object_not_exist(User)

        serializer = UserSerializer(user_instance)
        data = format_return_data(serializer.data, exclude_fields=["token", "password"])
        return Response(data, status=HTTP_200_OK)

    def put(self, request, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_not_exist(User)

        data = optional_fields(
            user_instance, request.data, ["name", "username", "password"]
        )

        # Password
        data["password"] = self.__hash_password(data["password"])

        serializer = UserSerializer(instance=user_instance, data=data, partial=True)

        if serializer.is_valid():
            # Change the username in letters
            original_username = user_instance.username
            new_username = escape(data["username"])
            if original_username != new_username:
                user_letters = Letter.objects.filter(username=original_username)
                for instance in user_letters:
                    instance.username = new_username
                    instance.save()

            # Save user
            serializer.save()
            # Update from cache

            cache_manager_singleton.set("username", new_username)

            return Response(
                {"res": "Successfully changed user data"}, status=HTTP_200_OK
            )
        # Send erros to front
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request: HttpRequest, token, *args, **kwargs) -> Response:
        user_instance = get_object(User, {"token": token})
        if not user_instance:
            return raise_object_not_exist(User)

        # Delete letters
        from requests import delete

        url = request.build_absolute_uri("/api/letter/user/")  # Url to request
        data = {"username": user_instance.username, "token": token}
        delete(url=url, data=data)

        # Delete user

        user_instance.delete()

        # Remove from cache

        cache_manager_singleton.delete("username", user_instance.username)

        return Response({"res": "User deleted!"}, status=HTTP_200_OK)
