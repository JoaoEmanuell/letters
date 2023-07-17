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


if __name__ == "__main__":
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

    # Path to save letters
    create_letters_dir()
