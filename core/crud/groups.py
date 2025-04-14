from fastapi import HTTPException
from sqlalchemy import select, update, delete, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Group, User
from core.schemas.groups import GroupCreate, GroupUpdate, GroupUpdatePartial


async def get_group(session: AsyncSession, group_id: int) -> Group | None:
    result = await session.execute(
        select(Group)
        .options(selectinload(Group.students), selectinload(Group.courses))
        .where(Group.id == group_id)
    )
    return result.scalar_one()


async def get_groups(
    session: AsyncSession,
    limit: int = 10,
    offset: int = 0,
) -> tuple[int, list[Group]]:
    total = await session.scalar(select(func.count()).select_from(Group)) or 0
    result = await session.execute(
        select(Group).order_by(Group.id).offset(offset).limit(limit)
    )
    return total, list(result.scalars().all())


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
    session: AsyncSession,
    group_id: int,
    group_in: GroupUpdate | GroupUpdatePartial,
    partial: bool = True,
) -> Group:

    values = group_in.dict(exclude_unset=partial)
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
        update(Group)
        .where(Group.id == group_id)
        .values(**values)
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


async def remove_student_from_group(
    session: AsyncSession, group: Group, student: User
) -> Group:
    if student in group.students:
        group.students.remove(student)
        await session.commit()
        await session.refresh(group)
    return group
