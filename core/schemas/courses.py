from typing import TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

from .groups import GroupReadShallow


class CourseBase(BaseModel):
    name: str
    description: str


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None


class CourseRead(CourseBase):
    id: int
    groups: list["GroupReadShallow"] | None

    model_config = ConfigDict(from_attributes=True)
