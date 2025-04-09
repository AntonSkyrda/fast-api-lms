from typing import TYPE_CHECKING

from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .mixins.id_int_pk import IdIntPkMixin
from .base import BaseModel
from .course_group_association import course_group_association_table

if TYPE_CHECKING:
    from .course import Course
    from .user import User


class Group(IdIntPkMixin, BaseModel):
    name: Mapped[str] = mapped_column(String(25))
    year_of_study: Mapped[int] = mapped_column(Integer)

    courses: Mapped[list["Course"]] = relationship(
        secondary=course_group_association_table,
        back_populates="groups",
    )

    students: Mapped[list["User"]] = relationship("User", back_populates="group")
