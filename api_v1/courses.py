from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.schemas.courses import CourseRead, CourseCreate, CourseUpdate
from core.crud import courses as crud


router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("/", response_model=list[CourseRead])
async def get_courses(session: AsyncSession = Depends(db_helper.session_getter)):
    return await crud.get_courses(session=session)


@router.get("/{course_id}/", response_model=CourseRead)
async def get_course(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    group = await crud.get_course(session=session, course_id=course_id)
    if group is not None:
        return group

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Group with id {course_id} not found",
    )


@router.post("/", response_model=CourseRead)
async def create_course(
    course_in: CourseCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await crud.create_course(course_in=course_in, session=session)


@router.put("/{course_id}/", response_model=CourseRead)
async def update_course_put(
    course_id: int,
    course_in: CourseUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_course = await crud.get_course(session=session, course_id=course_id)
    if existing_course is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    updated_course = await crud.update_course(
        session=session, course_id=course_id, course_in=course_in
    )
    return updated_course


@router.patch("/{course_id}/", response_model=CourseRead)
async def update_course_patch(
    course_id: int,
    course_in: CourseUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    existing_course = await crud.get_course(session=session, course_id=course_id)
    if existing_course is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    updated_course = await crud.update_course(
        session=session, course_id=course_id, course_in=course_in
    )
    return updated_course


@router.delete("/{course_id}/", response_model=CourseRead)
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
