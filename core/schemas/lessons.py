from datetime import date, time

from pydantic import BaseModel, ConfigDict

from core.models import Lesson


class LessonBase(BaseModel):
    program_id: int
    course_id: int
    lesson_date: date
    lesson_time: time
    group_ids: list[int] = []


class LessonRead(LessonBase):
    id: int

    @classmethod
    def from_orm(cls, lesson: "Lesson") -> "LessonRead":
        return cls(
            id=lesson.id,
            program_id=lesson.program_id,
            course_id=lesson.course_id,
            lesson_date=lesson.lesson_date,
            lesson_time=lesson.lesson_time,
            group_ids=[group.id for group in lesson.groups],
        )

    model_config = ConfigDict(from_attributes=True)


class LessonCreate(LessonBase):
    pass


class LessonUpdate(BaseModel):
    program_id: int | None = None
    course_id: int | None = None
    lesson_date: date | None = None
    lesson_time: time | None = None
    group_ids: list[int] | None = None
