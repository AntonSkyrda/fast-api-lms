from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.crud.base import CRUDBase
from core.models import Group, User
from core.schemas.groups import GroupCreate, GroupUpdate


group_crud = CRUDBase[Group, GroupCreate, GroupUpdate](Group)


async def get_group_by_id(
    session: AsyncSession,
    group_id: int,
) -> Group | None:
    result = await session.execute(
        select(Group)
        .options(selectinload(Group.students), selectinload(Group.courses))
        .where(Group.id == group_id)
    )
    return result.scalar_one_or_none()


async def add_student_to_group(
    session: AsyncSession,
    group: Group,
    student: User,
) -> Group:
    if student not in group.students:
        group.students.append(student)
        session.add(group)
        await session.commit()
        await session.refresh(group)
    return group


async def remove_student_from_group(
    session: AsyncSession,
    group: Group,
    student: User,
) -> Group:
    if student in group.students:
        group.students.remove(student)
        session.add(group)
        await session.commit()
        await session.refresh(group)
    return group
