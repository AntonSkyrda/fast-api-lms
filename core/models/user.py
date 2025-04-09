from typing import TYPE_CHECKING

from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase

from core.types.user_id import UserIdType
from .base import BaseModel
from .mixins.id_int_pk import IdIntPkMixin

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession
    from .group import Group
    from .course import Course


class User(BaseModel, IdIntPkMixin, SQLAlchemyBaseUserTable[UserIdType]):
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    father_name: Mapped[str] = mapped_column(String)
    is_teacher: Mapped[bool] = mapped_column(Boolean, default=False)
    is_student: Mapped[bool] = mapped_column(Boolean, default=False)

    group_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("group.id"), nullable=True
    )

    group: Mapped["Group"] = relationship("Group", back_populates="students")

    courses: Mapped[list["Course"]] = relationship(
        "Course", back_populates="teacher", cascade="all, delete-orphan"
    )

    @classmethod
    def get_db(cls, session: "AsyncSession") -> SQLAlchemyUserDatabase:
        return SQLAlchemyUserDatabase(session, cls)
