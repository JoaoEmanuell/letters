# letter

Letter is the API route responsible for managing operations related to letters.

## Methods allowed

**GET | POST | DELETE**

## Index

    http://{host}/api/letter

### Record

**POST**

Used to register new cards.

In case of success, it returns a success message.

json template:

    {
        "username": "text", // Username from registered user
        "date": "date", // Date from letter. **Optional field**
        "sender": "text", // Letter sender
        "text": "ABC", // Letter text
    }

Python example:

    from requests import post

    url = "http://{host}/api/letter"

    data = {
        "username": "username",
        "date": "01-01-2000",
        "sender": "Anonymous",
        "text": "ABC",
    }

    response = post(url, data=data)

Example javascript (fetch):

    const url = "http://{host}/api/letter"
    const data = {
        "username": "username",
        "date": "01-01-2000",
        "sender": "Anonymous",
        "text": "ABC",
    }

    const response = fetch(url, { 
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            "Content-Type": "application/json"
        }
    }).then(response => response.json());

**Return**:

    {
        res: "Letter sent successfully"
    }

#### Errors

*Invalid username*:

    {
        detail: "Username is not valid"
    }

## User

User is responsible for managing the letters received by the user.

    http://{host}/api/letter/user/

**POST | DELETE**

### POST

**POST**

Will return all letters received by the user.

json template:

    {
        "username": "text", // Username from registered user
        "token": "text" // Token from registered user
    }

Python example:

    from requests import post

    url = "http://{host}/api/letter/user/"

    data = {
        "username": "username",
        "token": "text"
    }

    response = post(url, data=data)

Example javascript (fetch):

    const url = "http://{host}/api/letter/user"
    const data = {
        "username": "username",
        "token": "text"
    }

    const response = fetch(url, { 
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            "Content-Type": "application/json"
        }
    }).then(response => response.json());

**RETURN**

Returns a list of objects, containing the letters received by the user.

    [
        {
            "date": "date",
            "sender": "text",
            "text": "text",
            "letter_token": "text"
        }
    ]

#### Errors

Invalid *username* or *token*:

    {
        "detail": "Username or token is not valid"
    }

### Delete

Will delete **all** letters received by the user.

json template:

    {
        "username": "text", // Username from registered user
        "token": "text" // Token from registered user
    }

Python example:

    from requests import delete

    url = "http://{host}/api/letter/user/"

    data = {
        "username": "username",
        "token": "text"
    }

    response = delete(url, data=data)

Example javascript (fetch):

    const url = "http://{host}/api/letter/user"
    const data = {
        "username": "username",
        "token": "text"
    }

    const response = fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json());

**Return**

    {
        "res": "Letters deleted!"
    }

#### Errors

Invalid *username* or *token*:

    {
        "detail": "Username or token is not valid"
    }

## Detail

Serves to manage data specific to a letter.

    http://{host}/api/letter/detail/<letter_token>/

**GET | DELETE**

### GET

Returns card information

Python example:

    from requests import get

    response = get("http://{host}/api/letter/detail/<letter_token>/")

Example javascript (fetch):

    const response = fetch("http://{host}/api/letter/detail/<letter_token>/", {
        method: "GET"
    }).then(response => response.json());

**Return:**

    {
        "username": "text",
        "date": "date",
        "text_path": "text",
        "sender": "text",
        "letter_token": "text",
        "text": "text"
    }

#### Errors

*Invalid token*:

    {
        "res": "Letter don't exists"
    }

### DELETE

Used to delete the letter.

Python example:

    from requests import delete

    response = delete("http://{host}/api/letter/detail/<letter_token>/")

Example javascript (fetch):

    const response = fetch("http://{host}/api/letter/detail/<letter_token>/", {
        method: "DELETE"
    }).then(response => response.json());

**Return**

    {
        res: "Letter deleted!"
    }

#### Errors

*Invalid token*:

    {
        "res": "Letter don't exists"
    }