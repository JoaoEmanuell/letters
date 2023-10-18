from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)

from django.utils.html import escape

from ..serializers import UserSerializer
from ...models import User
from ..common import (
    staff_get_all,
)

from main.utils import generate_hash, generate_random_hash


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
