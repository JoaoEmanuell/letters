def generate_token_hex() -> str:
    from secrets import token_hex

    return token_hex(32)


def generate_fernet_key() -> bytes:
    from cryptography.fernet import Fernet

    return Fernet.generate_key()


if __name__ == "__main__":
    # Cryptograph to models
    cryptograph_key = []
    for _ in range(8):  # Number of keys to generate, used to models
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
