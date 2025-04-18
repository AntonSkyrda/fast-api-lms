from fastapi import APIRouter, HTTPException, Depends, Query, status
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, User
from core.schemas.groups import (
    GroupReadPlain,
    GroupCreate,
    GroupUpdate,
    GroupUpdatePartial,
    GroupReadDetailed,
)
from core.schemas.pagination import PaginationResponse
from core.crud.groups import (
    group_crud,
    get_group_by_id,
    add_student_to_group,
    remove_student_from_group,
)


router = APIRouter(prefix="/groups", tags=["Groups"])


@router.get("/", response_model=PaginationResponse[GroupReadPlain])
async def get_groups(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    total, groups = await group_crud.get_all(session, offset=offset, limit=limit)
    return PaginationResponse(
        total=total,
        items=[GroupReadPlain.from_orm(group) for group in groups],
    )


@router.get("/{group_id}/", response_model=GroupReadDetailed)
async def get_group(
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail=f"Group with id {group_id} not found")
    return GroupReadDetailed.from_orm(group)


@router.post("/", response_model=GroupReadPlain)
async def create_group(
    group_in: GroupCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await group_crud.create(session, group_in)
    return GroupReadPlain.from_orm(group)


@router.put("/{group_id}/", response_model=GroupReadPlain)
async def update_group_put(
    group_id: int,
    group_in: GroupUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail="Group not found")
    updated = await group_crud.update(session, group_id, group_in, partial=False)
    return GroupReadPlain.from_orm(updated)


@router.patch("/{group_id}/", response_model=GroupReadDetailed)
async def update_group_patch(
    group_id: int,
    group_in: GroupUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail="Group not found")

    updated = await group_crud.update(session, group_id, group_in, partial=True)
    return GroupReadDetailed.from_orm(updated)


@router.delete("/{group_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_group(
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail="Group not found")
    await group_crud.remove(session, group_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/{group_id}/students/{user_id}/", response_model=GroupReadDetailed)
async def add_student_to_group_endpoint(
    group_id: int,
    user_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail="Group not found")

    student = await session.get(User, user_id)
    if not student:
        raise HTTPException(404, detail="User not found")

    if not student.is_student:
        raise HTTPException(400, detail="User is not a student")

    group = await add_student_to_group(session, group, student)
    return GroupReadDetailed.from_orm(group)


@router.delete("/{group_id}/students/{student_id}/", response_model=GroupReadDetailed)
async def remove_student_from_group_endpoint(
    group_id: int,
    student_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(404, detail="Group not found")

    student = await session.get(User, student_id)
    if not student:
        raise HTTPException(404, detail="Student not found")

    if student not in group.students:
        raise HTTPException(400, detail="Student is not a member of the group")

    group = await remove_student_from_group(session, group, student)
    return GroupReadDetailed.from_orm(group)
