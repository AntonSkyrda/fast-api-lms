from typing import TYPE_CHECKING

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import BaseModel
from core.models.mixins.id_int_pk import IdIntPkMixin

if TYPE_CHECKING:
    from core.models import Course


class CourseProgram(IdIntPkMixin, BaseModel):
    title: Mapped[str] = mapped_column(String)
    order: Mapped[int] = mapped_column(Integer)
    count_hours: Mapped[int] = mapped_column(Integer)
    course_id: Mapped[int] = mapped_column(ForeignKey("course.id"))

    course: Mapped["Course"] = relationship("Course", back_populates="programs")
