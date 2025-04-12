from pydantic import BaseModel, ConfigDict
from core.schemas.user import UserRead
from core.schemas.groups import GroupReadBase


class CourseBase(BaseModel):
    name: str
    description: str


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    name: str
    description: str


class CourseUpdatePartial(BaseModel):
    name: str | None = None
    description: str | None = None


class CourseReadBase(CourseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class CourseReadPlain(CourseReadBase):
    pass


class CourseReadDetailed(CourseReadBase):
    teacher: UserRead | None = None
    groups: list[GroupReadBase]
