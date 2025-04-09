from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, User
from core.schemas.groups import GroupRead, GroupCreate, GroupUpdate
from core.crud import groups as crud


router = APIRouter(prefix="/groups", tags=["Groups"])


@router.get("/", response_model=list[GroupRead])
async def get_groups(session: AsyncSession = Depends(db_helper.session_getter)):
    return await crud.get_groups(session=session)


@router.get("/{group_id}/", response_model=GroupRead)
async def get_group(
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await crud.get_group(session=session, group_id=group_id)
    if group is not None:
        return group

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Group with id {group_id} not found",
    )


@router.post("/", response_model=GroupRead)
async def create_group(
    group_in: GroupCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await crud.create_group(group_in=group_in, session=session)


@router.put("/{group_id}/", response_model=GroupRead)
async def update_group_put(
    group_id: int,
    group_in: GroupUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_group = await crud.get_group(session=session, group_id=group_id)
    if existing_group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group with id {group_id} not found",
        )

    updated_group = await crud.update_group(
        session=session, group_id=group_id, group_in=group_in
    )
    return updated_group


@router.patch("/{group_id}/", response_model=GroupRead)
async def update_group_patch(
    group_id: int,
    group_in: GroupUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_group = await crud.get_group(session=session, group_id=group_id)
    if existing_group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group with id {group_id} not found",
        )

    updated_group = await crud.update_group(
        session=session, group_id=group_id, group_in=group_in
    )
    return updated_group


@router.delete("/{group_id}/", response_model=GroupRead)
async def delete_group(
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_group = await crud.get_group(session=session, group_id=group_id)
    if existing_group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group with id {group_id} not found",
        )
    deleted_group = await crud.delete_group(session=session, group_id=group_id)
    return deleted_group


@router.post("/{group_id}/students/{user_id}/", response_model=GroupRead)
async def add_student_to_group_endpoint(
    group_id: int,
    user_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await crud.get_group(session=session, group_id=group_id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group with id {group_id} not found",
        )

    result = await session.execute(select(User).where(User.id == user_id))
    student = result.scalar_one_or_none()
    if student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )

    if not student.is_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not a student",
        )

    updated_group = await crud.add_student_to_group(
        session=session,
        group=group,
        student=student,
    )
    return updated_group


@router.delete("/{group_id}/students/{student_id}/", response_model=GroupRead)
async def remove_student_from_group_endpoint(
    group_id: int,
    student_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await crud.get_group(session=session, group_id=group_id)
    if not group:
        raise HTTPException(
            status_code=404, detail=f"Group with id {group_id} not found"
        )

    student = await session.get(User, student_id)
    if not student:
        raise HTTPException(
            status_code=404, detail=f"Student with id {student_id} not found"
        )

    if student not in group.students:
        raise HTTPException(
            status_code=400, detail="Student is not a member of the group"
        )

    group = await crud.remove_student_from_group(session, group, student)
    return group
