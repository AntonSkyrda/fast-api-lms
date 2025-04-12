from typing import TYPE_CHECKING
from fastapi_users import schemas
from pydantic import BaseModel, ConfigDict
from core.types.user_id import UserIdType

if TYPE_CHECKING:
    from .groups import GroupReadDetailed


class UserBase(BaseModel):
    first_name: str
    last_name: str
    father_name: str
    is_teacher: bool
    is_student: bool


class UserRead(UserBase, schemas.BaseUser[UserIdType]):
    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase, schemas.BaseUserCreate):
    pass


class UserUpdate(UserBase, schemas.BaseUserUpdate):
    pass


class UserReadShallow(UserBase, schemas.BaseUser[UserIdType]):
    model_config = ConfigDict(from_attributes=True)


class UserReadRelated(UserRead):
    group: "GroupReadDetailed | None" = None
    courses: list["CourseReadDetailed | None "] = None


from .groups import GroupReadDetailed
from .courses import CourseReadDetailed

UserRead.model_rebuild()
UserReadShallow.model_rebuild()
