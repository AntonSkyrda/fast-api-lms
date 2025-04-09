from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .mixins.id_int_pk import IdIntPkMixin
from .base import BaseModel
from .course_group_association import course_group_association_table

if TYPE_CHECKING:
    from .group import Group
    from .user import User


class Course(IdIntPkMixin, BaseModel):
    name: Mapped[str] = mapped_column(String(25))
    description: Mapped[str] = mapped_column(String(255))

    groups: Mapped[list["Group"]] = relationship(
        secondary=course_group_association_table, back_populates="courses"
    )

    teacher_id: Mapped[int | None] = mapped_column(ForeignKey("user.id"), nullable=True)

    teacher: Mapped["User | None"] = relationship("User", back_populates="courses")
