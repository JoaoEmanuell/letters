from os import remove
from typing import Union

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from django.utils.html import escape

from cryptography.fernet import InvalidToken

from .serializers import LetterSerializer
from ..models import Letter, User
from .common import (
    get_object,
    raise_object_not_exist,
    format_return_data,
    staff_get_all,
)

from main.utils import (
    cryptograph_text,
    decrypt_text,
    generate_random_hash,
)
from main.settings import BASE_DIR

LETTER_DIR = f"{BASE_DIR}/database/letters"


def validate_user(data: dict, msg: str) -> Union[Response, None]:
    try:
        user = User.objects.get(**data)
    except User.DoesNotExist:
        return Response({"detail": msg}, status=HTTP_400_BAD_REQUEST)
    else:
        return None


class LettersListApiView(APIView):
    def get(self, request, *args, **kwargs):
        return staff_get_all(request, Letter, LetterSerializer)

    def post(self, request, *args, **kwargs):
        text_path = generate_random_hash()  # path to save letter
        data = {
            "username": request.data.get("username"),
            "date": request.data.get("date"),
            "sender": escape(request.data.get("sender")),
            "text_path": text_path,
            "letter_token": generate_random_hash(),
        }
        # Validate user username
        user = validate_user({"username": data["username"]}, "Username is not valid")
        # If validate_user return is not None
        if user:
            return user

        serializer = LetterSerializer(data=data)
        if serializer.is_valid():
            # Save the letter
            text = request.data.get("text")
            text = escape(text)
            text = cryptograph_text(text)
            with open(f"{LETTER_DIR}/{text_path}.txt", "w") as file:
                file.write(text)
            serializer.save()
            return Response(
                {"res": "Letter sent successfully"}, status=HTTP_201_CREATED
            )
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class LetterUserListApiView(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            "username": request.data.get("username"),
            "token": request.data.get("token"),
        }

        user_instance = validate_user(
            {"username": data["username"], "token": data["token"]},
            "Username or token is not valid",
        )
        if user_instance:
            return user_instance

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

        data = format_return_data(
            list(serializer_data),
            include_fields=["date", "sender", "text", "letter_token"],
        )

        return Response(data, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        data = {
            "username": request.data.get("username"),
            "token": request.data.get("token"),
        }

        user_instance = validate_user(data, "Username or token is not valid")
        if user_instance:
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
    def get(self, request, letter_token, *args, **kwargs):
        letter_instance = get_object(Letter, {"letter_token": letter_token})
        if not letter_instance:
            return raise_object_not_exist(Letter)

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
        letter_instance = get_object(Letter, {"letter_token": letter_token})
        if not letter_instance:
            return raise_object_not_exist(Letter)

        letter_instance.delete()
        remove(f"{LETTER_DIR}/{letter_instance.text_path}.txt")
        return Response({"res": "Letter deleted!"}, status=HTTP_200_OK)
