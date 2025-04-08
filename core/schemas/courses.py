from typing import TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from .groups import GroupRead


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
    groups: list["GroupRead"] | None

    model_config = ConfigDict(from_attributes=True)


from .groups import GroupRead

CourseRead.model_rebuild()
