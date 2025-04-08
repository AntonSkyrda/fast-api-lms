from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
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
