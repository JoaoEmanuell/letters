from typing import Union

from django.db.models import Model
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
)


def get_object(model: Model, data: dict) -> Union[Model, None]:
    try:
        return model.objects.get(**data)
    except model.DoesNotExist:
        return None


def raise_object_dont_exist(model: Model) -> Response:
    return Response(
        {"res": f"{model._meta.model_name.capitalize()} don't exists"},
        status=HTTP_400_BAD_REQUEST,
    )
