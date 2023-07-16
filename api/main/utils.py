from bcrypt import hashpw, gensalt, checkpw


ENCODE = "utf-8"


def generate_hash(value: str) -> str:
    global ENCODE
    hashed = hashpw(bytes(value, encoding=ENCODE), gensalt(8))
    return hashed.decode(ENCODE)


def compare_hash(value: str, hash: str) -> bool:
    global ENCODE
    if type(hash) != bytes:
        hash = bytes(hash, encoding=ENCODE)
    return checkpw(bytes(value, encoding=ENCODE), hash)
