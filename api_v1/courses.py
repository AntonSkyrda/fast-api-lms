from fastapi import APIRouter, HTTPException, status, Depends, Query
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.schemas.courses import (
    CourseCreate,
    CourseUpdate,
    CourseUpdatePartial,
    CourseReadPlain,
    CourseReadDetailed,
)
from core.schemas.pagination import PaginationResponse
from core.crud.groups import get_group_by_id
from core.crud.courses import (
    course_crud,
    get_course_by_id,
    add_group_to_course,
    remove_group_from_course,
    assign_teacher_to_course,
    remove_teacher_from_course,
)

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("/", response_model=PaginationResponse[CourseReadPlain])
async def get_courses(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    total, courses = await course_crud.get_all(session, offset=offset, limit=limit)
    return PaginationResponse(
        total=total,
        items=[CourseReadPlain.from_orm(course) for course in courses],
    )


@router.get("/{course_id}/", response_model=CourseReadDetailed)
async def get_course(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    return CourseReadDetailed.from_orm(course)


@router.post("/", response_model=CourseReadPlain)
async def create_course(
    course_in: CourseCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await course_crud.create(session, course_in)
    return CourseReadPlain.from_orm(course)


@router.put("/{course_id}/", response_model=CourseReadDetailed)
async def update_course_put(
    course_id: int,
    course_in: CourseUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    updated = await course_crud.update(session, course.id, course_in, partial=False)
    return CourseReadDetailed.from_orm(updated)


@router.patch("/{course_id}/", response_model=CourseReadDetailed)
async def update_course_patch(
    course_id: int,
    course_in: CourseUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    updated = await course_crud.update(session, course.id, course_in, partial=True)
    return CourseReadDetailed.from_orm(updated)


@router.delete("/{course_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id {course_id} not found",
        )
    await course_crud.remove(session, course_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/{course_id}/groups/{group_id}/", response_model=CourseReadDetailed)
async def add_group_to_course_endpoint(
    course_id: int,
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    updated_course = await add_group_to_course(session, course, group)
    return CourseReadDetailed.from_orm(updated_course)


@router.delete("/{course_id}/groups/{group_id}/", response_model=CourseReadDetailed)
async def remove_group_from_course_endpoint(
    course_id: int,
    group_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await get_course_by_id(session, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    updated = await remove_group_from_course(session, course, group)
    return CourseReadDetailed.from_orm(updated)


@router.post("/{course_id}/add-teacher/{teacher_id}", response_model=CourseReadDetailed)
async def assign_teacher_to_course_endpoint(
    course_id: int,
    teacher_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await assign_teacher_to_course(session, course_id, teacher_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course or teacher not found, or teacher is invalid",
        )
    return CourseReadDetailed.from_orm(course)


@router.delete("/{course_id}/teacher", response_model=CourseReadDetailed)
async def delete_course_teacher_endpoint(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course = await remove_teacher_from_course(session, course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail=f"Course with id {course_id} not found",
        )
    return CourseReadDetailed.from_orm(course)
