from typing import TYPE_CHECKING

from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.mixins.id_int_pk import IdIntPkMixin
from core.models.base import BaseModel
from core.models.course_group_association import course_group_association_table
from core.models.lesson_group_association import lesson_group_association_table

if TYPE_CHECKING:
    from .course import Course
    from .user import User
    from .lesson import Lesson


class Group(IdIntPkMixin, BaseModel):
    name: Mapped[str] = mapped_column(String(25))
    year_of_study: Mapped[int] = mapped_column(Integer)

    courses: Mapped[list["Course"]] = relationship(
        secondary=course_group_association_table,
        back_populates="groups",
    )

    students: Mapped[list["User"]] = relationship("User", back_populates="group")

    lessons: Mapped[list["Lesson"]] = relationship(
        secondary=lesson_group_association_table,
        back_populates="groups",
        passive_deletes=True,
    )
