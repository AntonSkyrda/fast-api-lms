from sqlalchemy import select, update, delete
from sqlalchemy.engine import Result
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Group, User, Course
from core.schemas.groups import GroupCreate, GroupUpdate


async def get_group(session: AsyncSession, group_id: int) -> Group | None:
    result = await session.execute(
        select(Group)
        .options(
            selectinload(Group.courses).selectinload(Course.groups),
            selectinload(Group.students),
        )
        .where(Group.id == group_id)
    )
    return result.scalars().first()


async def get_groups(session: AsyncSession) -> list[Group]:
    stmt = (
        select(Group)
        .order_by(Group.id)
        .options(
            selectinload(Group.courses).selectinload(Course.groups),
            selectinload(Group.students),
        )
    )
    result: Result = await session.execute(stmt)
    groups = result.scalars().all()
    return list(groups)


async def create_group(session: AsyncSession, group_in: GroupCreate) -> Group:
    group = Group(**group_in.model_dump())
    session.add(group)
    await session.commit()
    await session.refresh(group)

    result = await session.execute(
        select(Group)
        .options(
            selectinload(Group.courses),
            selectinload(Group.students),
        )
        .where(Group.id == group.id)
    )

    return result.scalar_one()


async def update_group(
    session: AsyncSession, group_id: int, group_in: GroupUpdate
) -> Group:

    stmt = (
        update(Group)
        .where(Group.id == group_id)
        .values(**group_in.dict(exclude_unset=True))
        .execution_options(synchronize_session="fetch")
    )
    await session.execute(stmt)
    await session.commit()
    result = await session.execute(select(Group).where(Group.id == group_id))
    return result.scalar_one()


async def delete_group(session: AsyncSession, group_id: int) -> Group | None:

    result = await session.execute(select(Group).where(Group.id == group_id))
    group = result.scalar_one_or_none()
    if group is None:
        return None

    stmt = delete(Group).where(Group.id == group_id)
    await session.execute(stmt)
    await session.commit()
    return group


async def add_student_to_group(
    session: AsyncSession, group: Group, student: User
) -> Group:
    if student not in group.students:
        group.students.append(student)

        await session.commit()
        await session.refresh(group)
    return group
