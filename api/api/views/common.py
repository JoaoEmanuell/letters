from typing import Union

from django.db.models import Model
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
)


def get_object(model: Model, data: dict) -> Union[Model, None]:
    """Get object or none if not exists

    Args:
        model (Model): Model created on models
        data (dict): Data for search

    Returns:
        Union[Model, None]: If exists data, return it, else, return None
    """
    try:
        return model.objects.get(**data)
    except model.DoesNotExist:
        return None


def raise_object_dont_exist(model: Model) -> Response:
    """Return a response if object don't exists

    Args:
        model (Model): Model created on models

    Returns:
        Response: Response with dict, and status 400
    """
    return Response(
        {"res": f"{model._meta.model_name.capitalize()} don't exists"},
        status=HTTP_400_BAD_REQUEST,
    )


def optional_fields(
    object_instance: Model, data: dict, optional_fields: list[str]
) -> dict:
    """If field don't passed on request, use the original value saved in database

    Args:
        object_instance (Model): Object instance saved in the database
        data (dict): Data with the request dict
        optional_fields (list[str]): optional fields for validate

    Returns:
        dict: _description_
    """
    new_data = {}

    for field in optional_fields:
        value = data.get(field)
        if not value:
            new_data[field] = object_instance.__getattribute__(
                field
            )  # Original value saved
            new_data[f"_{field}_data"] = object_instance.__getattribute__(field)
        else:
            new_data[field] = value
            new_data[f"_{field}_data"] = value

    return new_data
