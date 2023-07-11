from django.test import TestCase

from api.models import LetterModel, UserModel
from datetime import date

# Create your tests here.


class UserModelTestCase(TestCase):
    def setUp(self):
        UserModel.objects.create(name="test", password="test")

    def test_get_user(self):
        test_user = UserModel.objects.get(name="test")
        self.assertEqual(test_user.password, "test")


class LetterModelTestCase(TestCase):
    def setUp(self):
        UserModel.objects.create(name="test", password="test")

    def test_create_letter(self):
        user = UserModel.objects.get(name="test")
        letter_dict = {
            "user": user,
            "date": date(2005, 7, 27),
            "text": "Test letter",
            "sender": "Anonymous",
        }
        LetterModel.objects.create(**letter_dict)
        letter = LetterModel.objects.get(sender="Anonymous")
        self.assertEqual(letter.text, "Test letter")
        self.assertEqual(letter.id, 1)
        self.assertEqual(letter.user, user)
