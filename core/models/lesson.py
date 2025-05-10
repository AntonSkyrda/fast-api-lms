from datetime import date, time
from typing import TYPE_CHECKING

from sqlalchemy import DATE, Time, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import BaseModel
from core.models.mixins.id_int_pk import IdIntPkMixin
from core.models.lesson_group_association import lesson_group_association_table

if TYPE_CHECKING:
    from core.models import Group
    from core.models import Course
    from core.models import CourseProgram


class Lesson(IdIntPkMixin, BaseModel):
    course_id: Mapped[int] = mapped_column(
        ForeignKey("course.id"),
        nullable=False,
    )
    program_id: Mapped[int] = mapped_column(
        ForeignKey("courseprogram.id"),
        nullable=False,
    )
    lesson_date: Mapped[date] = mapped_column(DATE, nullable=False)
    lesson_time: Mapped[time] = mapped_column(Time, nullable=False)

    course: Mapped["Course"] = relationship(back_populates="lessons")
    program: Mapped["CourseProgram"] = relationship(back_populates="lessons")

    groups: Mapped[list["Group"]] = relationship(
        secondary=lesson_group_association_table,
        back_populates="lessons",
        passive_deletes=True,
    )
