from typing import TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from .courses import CourseReadPlain
    from .user import UserReadShallow


class GroupBase(BaseModel):
    name: str
    year_of_study: int


class GroupCreate(GroupBase):
    pass


class GroupUpdate(BaseModel):
    pass


class GroupUpdatePartial(BaseModel):
    name: str | None = None
    year_of_study: int | None = None


class GroupReadBase(GroupBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class GroupReadPlain(GroupReadBase):
    pass


class GroupReadDetailed(GroupReadBase):
    students: list["UserReadShallow"]
    courses: list["CourseReadPlain"]


from .courses import CourseReadPlain
from .user import UserReadShallow

GroupReadPlain.model_rebuild()
GroupReadDetailed.model_rebuild()
