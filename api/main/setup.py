def generate_token_hex() -> str:
    from secrets import token_hex

    return token_hex(32)


def generate_fernet_key() -> bytes:
    from cryptography.fernet import Fernet

    return Fernet.generate_key()


def create_letters_dir() -> None:
    from os import mkdir
    from os.path import exists
    from pathlib import Path

    BASE_DIR = Path(__file__).resolve().parent.parent

    path_to_letters = f"{BASE_DIR}/database/letters/"
    if not exists(path_to_letters):
        mkdir(path_to_letters)


def copy_settings() -> None:
    from os.path import exists

    if not exists("settings.py"):
        with open("settings_example.py", "r") as settings_example:
            settings_example = settings_example.read()
            with open("settings.py", "w") as settings:
                settings_with_secret_key = _write_django_secret_key(settings_example)
                settings.write(settings_with_secret_key)


def _write_django_secret_key(settings: str) -> str:
    from django.core.management.utils import get_random_secret_key

    settings_with_secret = settings
    settings_with_secret = settings_with_secret.replace(
        'SECRET_KEY = "our_secret_here"',
        f'SECRET_KEY = "{get_random_secret_key()}"',
    )
    return settings_with_secret


def create_database() -> None:
    from os import mkdir
    from os.path import exists
    from pathlib import Path

    BASE_DIR = Path(__file__).resolve().parent.parent

    path_to_database = f"{BASE_DIR}/database/"
    # Create database dir
    if not exists(path_to_database):
        mkdir(path_to_database)

    # Create sqlite3 db
    if not exists(f"{path_to_database}/db.sqlite3"):
        with open(f"{path_to_database}/db.sqlite3", "w") as file:
            file.write("")

    # Create letters
    path_to_letters = f"{path_to_database}letters/"
    if not exists(path_to_letters):
        mkdir(path_to_letters)


if __name__ == "__main__":
    # Create database
    create_database()

    # Copy settings
    copy_settings()

    # Cryptograph to models
    cryptograph_key = []
    for _ in range(9):  # Number of keys to generate, used to models
        cryptograph_key.append(generate_token_hex())

    cryptograph_str = (
        f"\n\n# Encrypted fields\n\nFIELD_ENCRYPTION_KEYS = {cryptograph_key}\n"
    )

    with open("settings.py", "a") as file:
        file.write(cryptograph_str)

    # Cryptograph to letters
    cryptograph_str = f"\n\n# Fernet key\n\nFERNET_KEY = {generate_fernet_key()}\n"

    with open("settings.py", "a") as file:
        file.write(cryptograph_str)
