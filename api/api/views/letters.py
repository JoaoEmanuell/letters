from os import remove

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from django.utils.html import escape

from cryptography.fernet import InvalidToken

from .serializers import LetterSerializer
from ..models import Letter, User

from main.utils import (
    cryptograph_text,
    decrypt_text,
    generate_random_hash,
)
from main.settings import BASE_DIR

LETTER_DIR = f"{BASE_DIR}/database/letters"


class LettersListApiView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_staff:
            letters = Letter.objects.all()
            serializer = LetterSerializer(letters, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(
            {"detail": "Authentication credentials were not provided."},
            status=HTTP_401_UNAUTHORIZED,
        )

    def post(self, request, *args, **kwargs):
        text_path = generate_random_hash()  # path to save letter
        data = {
            "username": request.data.get("username"),
            "date": request.data.get("date"),
            "sender": escape(request.data.get("sender")),
            "text_path": text_path,
            "letter_token": generate_random_hash(),
        }
        # Validate user token
        try:
            user = User.objects.get(username=data["username"])
        except User.DoesNotExist:
            return Response(
                {"detail": "Username is not valid"}, status=HTTP_400_BAD_REQUEST
            )

        serializer = LetterSerializer(data=data)
        if serializer.is_valid():
            # Save the letter
            text = request.data.get("text")
            text = escape(text)
            text = cryptograph_text(text)
            with open(f"{LETTER_DIR}/{text_path}.txt", "w") as file:
                file.write(text)
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class LetterUserListApiView(APIView):
    def __validate_user(self, username: str, token: str):
        try:
            user_instance = User.objects.get(username=username, token=token)
            return True
        except User.DoesNotExist:
            return Response(
                {"detail": "Username or token is not valid"},
                status=HTTP_400_BAD_REQUEST,
            )

    def post(self, request, *args, **kwargs):
        data = {
            "username": request.data.get("username"),
            "token": request.data.get("token"),
        }

        user_instance = self.__validate_user(**data)
        if type(user_instance) != bool:
            return user_instance
        else:
            letters = Letter.objects.filter(username=data["username"])
            serializer = LetterSerializer(letters, many=True)
            serializer_data = serializer.data

            # Decrypt letter

            for i, letter in enumerate(letters):
                with open(f"{LETTER_DIR}/{letter.text_path}.txt", "r") as file:
                    try:
                        text = decrypt_text(file.read())
                    except InvalidToken:  # If letter is empty
                        text = ""
                serializer_data[i]["text"] = text

            return Response(serializer_data, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        data = {
            "username": request.data.get("username"),
            "token": request.data.get("token"),
        }

        user_instance = self.__validate_user(**data)
        if type(user_instance) != bool:
            return user_instance
        else:
            letters = Letter.objects.filter(username=data["username"])

            # Remove letter from server

            for letter in letters:
                remove(f"{LETTER_DIR}/{letter.text_path}.txt")

            # Delete from database

            letters.delete()
            return Response({"res": "Letters deleted!"}, status=HTTP_200_OK)


class LetterDetailApiView(APIView):
    def __get_object(self, letter_token: str):
        try:
            return Letter.objects.get(letter_token=letter_token)
        except Letter.DoesNotExist:
            return None

    def __letter_dont_exists(self) -> Response:
        return Response({"res": "Letter don't exists"}, status=HTTP_400_BAD_REQUEST)

    def get(self, request, letter_token, *args, **kwargs):
        letter_instance = self.__get_object(letter_token)
        if not letter_instance:
            return self.__letter_dont_exists()

        serializer = LetterSerializer(letter_instance)
        # Decrypt letter
        serializer_data = serializer.data
        text_path = letter_instance.text_path

        with open(f"{LETTER_DIR}/{text_path}.txt", "r") as file:
            text = file.read()

        text = decrypt_text(text)
        serializer_data["text"] = text

        return Response(serializer_data, status=HTTP_200_OK)

    def delete(self, request, letter_token, *args, **kwargs):
        letter_instance = self.__get_object(letter_token)
        if not letter_instance:
            return self.__letter_dont_exists()

        letter_instance.delete()
        remove(f"{LETTER_DIR}/{letter_instance.text_path}.txt")
        return Response({"res": "Letter deleted!"}, status=HTTP_200_OK)
