from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.schemas.courses import (
    CourseCreate,
    CourseUpdate,
    CourseUpdatePartial,
    CourseReadPlain,
    CourseReadDetailed,
)
from core.crud import courses as crud
from core.crud.groups import get_group


router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("/", response_model=list[CourseReadPlain])
async def get_courses(session: AsyncSession = Depends(db_helper.session_getter)):
    return await crud.get_courses(session=session)


@router.get("/{course_id}/", response_model=CourseReadDetailed)
async def get_course(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.get_course(session=session, course_id=course_id)
    if course is not None:
        return course
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Course with id {course_id} not found",
    )


@router.post("/", response_model=CourseReadPlain)
async def create_course(
    course_in: CourseCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await crud.create_course(course_in=course_in, session=session)


@router.put("/{course_id}/", response_model=CourseReadDetailed)
async def update_course_put(
    course_id: int,
    course_in: CourseUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.get_course(session=session, course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )

    return await crud.update_course(
        session=session,
        course_id=course_id,
        course_in=course_in,
        partial=False,
    )


@router.patch("/{course_id}/", response_model=CourseUpdatePartial)
async def update_course_patch(
    course_id: int,
    course_in: CourseUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.get_course(session=session, course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )

    return await crud.update_course(
        session,
        course_id,
        course_in,
        partial=True,
    )


@router.delete("/{course_id}/", response_model=CourseReadPlain)
async def delete_course(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_course = await crud.get_course(session=session, course_id=course_id)
    if existing_course is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    deleted_course = await crud.delete_course(session=session, course_id=course_id)
    return deleted_course


@router.post("/{course_id}/groups/{group_id}/", response_model=CourseReadDetailed)
async def add_group_to_course_endpoint(
    course_id: int,
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.get_course(session=session, course_id=course_id)
    if course is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )

    group = await get_group(session=session, group_id=group_id)
    if group is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group with id {group_id} not found",
        )

    updated_course = await crud.add_group_to_course(
        session=session, course=course, group=group
    )
    return updated_course


@router.post("/{course_id}/add-teacher/{teacher_id}", response_model=CourseReadDetailed)
async def assign_teacher_to_course(
    course_id: int,
    teacher_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.add_teacher_to_course(session, course_id, teacher_id)

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course or teacher not found, or teacher is invalid",
        )

    return course


@router.delete("/{course_id}/teacher", response_model=CourseReadDetailed)
async def delete_course_teacher(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await crud.remove_teacher_from_course(session=session, course_id=course_id)
    if course is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    return course
