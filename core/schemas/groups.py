from typing import TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from .courses import CourseRead


class GroupBase(BaseModel):
    name: str
    year_of_study: int


class GroupCreate(GroupBase):
    pass


class GroupUpdate(BaseModel):
    name: str | None = None
    year_of_study: int | None = None

    model_config = ConfigDict(from_attributes=True)


class GroupRead(GroupBase):
    id: int
    courses: list["CourseRead"] | None

    model_config = ConfigDict(from_attributes=True)


class GroupReadShallow(GroupBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


from .courses import CourseRead

GroupRead.model_rebuild()
