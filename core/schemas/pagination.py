from typing import Generic, TypeVar

from pydantic import BaseModel


T = TypeVar("T")


class PaginationResponse(BaseModel, Generic[T]):
    total: int
    items: list[T]
