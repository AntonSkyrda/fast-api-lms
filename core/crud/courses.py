from fastapi import HTTPException
from sqlalchemy import select, update, delete, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Course, Group, User
from core.schemas.courses import CourseCreate, CourseUpdate, CourseUpdatePartial


async def get_course(session: AsyncSession, course_id: int) -> Course | None:
    result = await session.execute(
        select(Course)
        .options(selectinload(Course.teacher), selectinload(Course.groups))
        .where(Course.id == course_id)
    )
    return result.scalar_one_or_none()


async def get_courses(
    session: AsyncSession, limit: int = 10, offset: int = 0
) -> tuple[int, list[Course]]:
    total = await session.scalar(select(func.count()).select_from(Course)) or 0
    result = await session.execute(
        select(Course).order_by(Course.id).offset(offset).limit(limit)
    )
    return total, list(result.scalars().all())


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
    session: AsyncSession,
    course_id: int,
    course_in: CourseUpdate | CourseUpdatePartial,
    partial: bool = True,
) -> Course:
    values = course_in.dict(exclude_unset=partial)
    if not values:
        raise HTTPException(
            status_code=400,
            detail=(
                "No fields provided for update"
                if partial
                else "PUT request must contain all fields"
            ),
        )

    stmt = (
        update(Course)
        .where(Course.id == course_id)
        .values(**values)
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


async def add_teacher_to_course(
    session: AsyncSession, course_id: int, teacher_id: int
) -> Course | None:
    course = await session.get(Course, course_id)
    teacher = await session.get(User, teacher_id)

    if not course or not teacher or not teacher.is_teacher:
        return None

    course.teacher_id = teacher.id
    await session.commit()

    result = await session.execute(
        select(Course)
        .options(
            selectinload(Course.teacher),
            selectinload(Course.groups),
        )
        .where(Course.id == course_id)
    )
    return result.scalar_one_or_none()


async def remove_teacher_from_course(
    session: AsyncSession, course_id: int
) -> Course | None:
    result = await session.execute(
        select(Course)
        .options(
            selectinload(Course.teacher),
            selectinload(Course.groups),
        )
        .where(Course.id == course_id)
    )

    course = result.scalar_one_or_none()
    if not course:
        return None

    course.teacher_id = None
    await session.commit()
    await session.refresh(course)

    return course
