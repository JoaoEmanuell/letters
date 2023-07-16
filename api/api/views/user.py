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


class UserListApiView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_staff:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(
            {"detail": "Authentication credentials were not provided."},
            status=HTTP_401_UNAUTHORIZED,
        )
