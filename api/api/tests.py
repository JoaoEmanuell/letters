from django.test import TestCase

from requests import get, post, put, delete

# Create your tests here.


class UserTest(TestCase):
    def setUp(self):
        self.__url = "http://localhost:8000/api/user"

    def test_get_all_users(self):
        response = get(self.__url)
        status_code = response.status_code
        json = response.json()

        self.assertEqual(status_code, 401)
        self.assertEqual(
            json, {"detail": "Authentication credentials were not provided."}
        )

    def test_crud(self):
        # Create
        data = {"name": "test", "username": "test", "password": "test"}
        response = post(self.__url, data=data)

        status_code = response.status_code
        json = response.json()
        new_data = json

        token = new_data["token"]

        self.assertEqual(status_code, 201)
        self.assertEqual(data["username"], json["username"])

        # Read
        detail_url = f"{self.__url}/detail/{token}"
        response = get(detail_url)
        status_code = response.status_code
        json = response.json()

        self.assertEqual(status_code, 200)
        self.assertEqual(json, new_data)

        # Put
        data_put = data
        data_put["name"] = "abc"

        response = put(detail_url, data=data_put)
        status_code = response.status_code
        json = response.json()
        self.assertEqual(status_code, 200)
        self.assertEqual(json["name"], data_put["name"])

        # Delete
        response = delete(detail_url)
        status_code = response.status_code
        json = response.json()

        self.assertEqual(status_code, 200)
        self.assertEqual(json, {"res": "User deleted!"})

    def test_login(self):
        # Create
        data = {"name": "test", "username": "test", "password": "test"}
        response = post(self.__url, data=data)
        status_code = response.status_code
        self.assertEqual(status_code, 201)

        json = response.json()
        token = json["token"]

        # Login
        data_login = {"username": "test", "password": "test"}
        response = post(f"{self.__url}/login", data=data_login)

        status_code = response.status_code
        self.assertEqual(status_code, 200)

        json = response.json()
        token_login = json["res"]
        self.assertEqual(token, token_login)

        # Invalid password
        data_login["password"] = "abc"
        response = post(f"{self.__url}/login", data=data_login)

        status_code = response.status_code
        self.assertEqual(status_code, 400)

        json = response.json()
        self.assertEqual({"res": "Invalid password"}, json)

        # Delete
        response = delete(f"{self.__url}/detail/{token_login}")

        status_code = response.status_code
        self.assertEqual(status_code, 200)


class LetterTest(TestCase):
    def setUp(self):
        self.__url = "http://localhost:8000/api/letter"

    def create_user(self) -> str:
        url = "http://localhost:8000/api/user"
        data = {"name": "test", "username": "test", "password": "test"}
        response = post(url, data=data)

        return response.json()["token"]

    def delete_user(self, token: str):
        url = "http://localhost:8000/api/user"
        response = delete(f"{url}/detail/{token}")

    def test_get_all_letters(self):
        response = get(self.__url)
        status_code = response.status_code
        json = response.json()

        self.assertEqual(status_code, 401)
        self.assertEqual(
            json, {"detail": "Authentication credentials were not provided."}
        )

    def test_crud(self):
        # User create for get token
        user_token = self.create_user()

        # Create
        data = {
            "user_token": user_token,
            "date": "01-01-2000",
            "sender": "Anonymous",
            "text": "ABC",
        }

        response = post(self.__url, data=data)
        json = response.json()
        letter_token = json["letter_token"]

        self.assertEqual(data["user_token"], json["user_token"])

        # GET
        response = get(f"{self.__url}/detail/{letter_token}")
        json = response.json()

        self.assertEqual(data["text"], json["text"])
        self.assertEqual(data["sender"], json["sender"])

        # Delete letter
        response = delete(f"{self.__url}/detail/{letter_token}")
        json = response.json()

        self.assertEqual({"res": "Letter deleted!"}, json)

        # Create a new

        response = post(self.__url, data=data)

        # Get all letters from user
        response = get(f"{self.__url}/user/{user_token}")
        json = response.json()

        self.assertEqual(json[0]["text"], data["text"])

        # Delete all letters
        response = delete(f"{self.__url}/user/{user_token}")
        json = response.json()

        self.assertEqual({"res": "Letters deleted!"}, json)

        # Delete user
        self.delete_user(user_token)
