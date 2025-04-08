from sqlalchemy import select, update, delete
from sqlalchemy.engine import Result
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Course, Group
from core.schemas.courses import CourseCreate, CourseUpdate


async def get_course(session: AsyncSession, course_id: int) -> Course | None:
    result = await session.execute(
        select(Course)
        .options(selectinload(Course.groups))
        .where(Course.id == course_id)
    )
    return result.scalars().first()


async def get_courses(session: AsyncSession) -> list[Course]:
    stmt = select(Course).order_by(Course.id).options(selectinload(Course.groups))
    result: Result = await session.execute(stmt)
    courses = result.scalars().all()
    return list(courses)


async def create_course(session: AsyncSession, course_in: CourseCreate) -> Course:
    course = Course(**course_in.model_dump())
    session.add(course)
    await session.commit()
    await session.refresh(course)

    result = await session.execute(
        select(Course)
        .options(selectinload(Course.groups))
        .where(Course.id == course.id)
    )

    return result.scalar_one()


async def update_course(
    session: AsyncSession, course_id: int, course_in: CourseUpdate
) -> Course:
    stmt = (
        update(Course)
        .where(Course.id == course_id)
        .values(**course_in.dict(exclude_unset=True))
        .execution_options(synchronize_session="fetch")
    )
    await session.execute(stmt)
    await session.commit()

    result = await session.execute(select(Course).where(Course.id == course_id))
    return result.scalar_one()


async def delete_course(session: AsyncSession, course_id: int) -> Course | None:
    result = await session.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()

    if course is None:
        return None

    stmt = delete(Course).where(Course.id == course_id)
    await session.execute(stmt)
    await session.commit()
    return course


async def add_group_to_course(
    session: AsyncSession, course: Course, group: Group
) -> Course:
    if group not in course.groups:
        course.groups.append(group)
        await session.commit()
        await session.refresh(course)
    return course
