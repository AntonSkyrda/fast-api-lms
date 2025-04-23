from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from core.models.lesson import Lesson
from core.schemas.lessons import LessonCreate, LessonUpdate
from core.models.group import Group

from core.crud.base import CRUDBase


lesson_crud = CRUDBase[Lesson, LessonCreate, LessonUpdate](Lesson)


async def get_lesson_by_id(session: AsyncSession, lesson_id: int) -> Lesson | None:
    result = await session.execute(
        select(Lesson)
        .options(
            selectinload(Lesson.program),
            selectinload(Lesson.course),
            selectinload(Lesson.groups),
        )
        .where(Lesson.id == lesson_id)
    )
    return result.scalar_one_or_none()


async def create_lesson_with_groups(
    session: AsyncSession,
    lesson_in: LessonCreate,
) -> Lesson:
    lesson = Lesson(
        program_id=lesson_in.program_id,
        course_id=lesson_in.course_id,
        lesson_date=lesson_in.lesson_date,
        lesson_time=lesson_in.lesson_time,
    )

    if lesson_in.group_ids:
        result = await session.execute(
            select(Group).where(Group.id.in_(lesson_in.group_ids))
        )
        groups = result.scalars().all()

        for group in groups:
            if group not in lesson.groups:
                lesson.groups.append(group)

    session.add(lesson)
    await session.commit()

    result = await session.execute(
        select(Lesson)
        .options(selectinload(Lesson.groups))
        .where(Lesson.id == lesson.id)
    )
    return result.scalar_one()


async def get_lessons(
    session: AsyncSession, offset: int, limit: int
) -> tuple[int, list[Lesson]]:
    total = await session.scalar(select(func.count()).select_from(Lesson))

    result = await session.execute(
        select(Lesson)
        .options(selectinload(Lesson.groups))
        .order_by(Lesson.id)
        .offset(offset)
        .limit(limit)
    )
    lessons = result.scalars().all()
    return total, list(lessons)
