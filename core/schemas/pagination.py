from typing import Generic, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel


T = TypeVar("T")


class PaginationResponse(BaseModel, Generic[T]):
    total = int
    items: list[T]
