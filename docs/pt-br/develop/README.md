- [Desenvolvimento](#desenvolvimento)
  - [Settings](#settings)
- [Database](#database)
- [Executando](#executando)
- [Testes](#testes)


# Desenvolvimento

Certifique-se de ter o *docker* e o *docker-compose* instalados.

Navegue até a pasta da api

Faça a build:

    docker-compose build

Execute o container:

    docker-compose up -d

Execute o bash no container:

    docker container exec -it api_api_1 bash

Navegue até a pasta *main* e execute o setup.py

    python setup.py

Ele irá criar uma copia de *settings_example*, criar a *database*, pasta para armazenamento das *letters*, configurações de criptografia.

Em suma, o *setup* permite a configuração automática de tudo necessário para a execução do programa.

## Settings

No settings, lembre-se de configurar os *ALLOWED_HOSTS* para permitir o acesso a api por outros hosts.

    ALLOWED_HOSTS = ["host"]

Para o desenvolvimento, pode-ser útil a visualização dos dados no navegador, para isso comente a linha *DEFAULT_RENDERER_CLASSES*

    REST_FRAMEWORK = {
        "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
        # "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
        "PAGE_SIZE": 10,
    }

# Database

Navegue para a raiz do projeto

    cd ..

Faça a migração da base de dados

    python manage.py migrate

Crie o super usuário

    python manage.py createsuperuser

# Executando

Para executar o projeto, você deve usar o seguinte comando:

    python manage.py runserver 0.0.0.0:8000

Isso fará ele ser exposto na porta 8000, conforme determinação do *Dockerfile*.

Assim, para acessar a api basta acessar:

    http://localhost:8000/api

# Testes

Para ter certeza do funcionamento da api, execute os testes:

    python manage.py test api/tests/

Caso não seja retornado nenhum erro, é um sinal de que a api está pronta para uso.