from pydantic import BaseModel, ConfigDict

from .groups import GroupReadShallow
from .user import UserReadShallow


class CourseBase(BaseModel):
    name: str
    description: str


class CourseCreate(CourseBase):
    teacher_id: int | None = None


class CourseUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    teacher_id: int | None = None


class CourseRead(CourseBase):
    id: int
    teacher: UserReadShallow | None = None
    groups: list[GroupReadShallow] | None = None

    model_config = ConfigDict(from_attributes=True)
