from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.crud.base import CRUDBase
from core.models.course import Course
from core.models.user import User
from core.models.group import Group
from core.schemas.courses import CourseCreate, CourseUpdate


course_crud = CRUDBase[Course, CourseCreate, CourseUpdate](Course)


async def get_course_by_id(session: AsyncSession, course_id: int) -> Course | None:
    result = await session.execute(
        select(Course)
        .options(
            selectinload(Course.teacher),
            selectinload(Course.groups),
            selectinload(Course.programs),
        )
        .where(Course.id == course_id)
    )
    return result.scalar_one_or_none()


async def add_group_to_course(
    session: AsyncSession,
    course: Course,
    group: Group,
) -> Course:
    if group not in course.groups:
        course.groups.append(group)
        session.add(course)
        await session.commit()
        await session.refresh(course)
    return course


async def remove_group_from_course(
    session: AsyncSession,
    course: Course,
    group: Group,
) -> Course:
    if group not in course.groups:
        raise HTTPException(
            status_code=400, detail="Group is not assigned to this course"
        )

    course.groups.remove(group)
    await session.commit()
    await session.refresh(course)
    return course


async def assign_teacher_to_course(
    session: AsyncSession,
    course_id: int,
    teacher_id: int,
) -> Course | None:
    course = await get_course_by_id(session, course_id)
    if not course:
        return None

    teacher = await session.get(User, teacher_id)
    if not teacher or not teacher.is_teacher:
        return None

    course.teacher = teacher
    session.add(course)
    await session.commit()
    await session.refresh(course)
    return course


async def remove_teacher_from_course(
    session: AsyncSession,
    course_id: int,
) -> Course | None:
    course = await session.get(Course, course_id)
    if not course:
        return None

    course.teacher_id = None
    await session.commit()

    result = await session.execute(
        select(Course)
        .options(selectinload(Course.groups), selectinload(Course.teacher))
        .where(Course.id == course_id)
    )
    return result.scalar_one_or_none()
