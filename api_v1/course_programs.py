from fastapi import APIRouter, HTTPException, status, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.schemas.course_programs import (
    CourseProgramRead,
    CourseProgramCreate,
    CourseProgramUpdate,
    CourseProgramUpdatePartial,
)

from core.schemas.pagination import PaginationResponse
from core.crud.course_programs import course_program_crud, get_course_program_by_id


router = APIRouter(prefix="/course-programs", tags=["CoursePrograms"])


@router.get("/", response_model=PaginationResponse[CourseProgramRead])
async def get_course_programs(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    total, course_programs = await course_program_crud.get_all(
        session, limit=limit, offset=offset
    )
    return PaginationResponse(
        total=total,
        items=[
            CourseProgramRead.from_orm(course_program)
            for course_program in course_programs
        ],
    )


@router.get("/{course_program_id}", response_model=CourseProgramRead)
async def get_course_program(
    course_program_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course_program = await get_course_program_by_id(session, course_program_id)
    return CourseProgramRead.from_orm(course_program)


@router.post("/", response_model=CourseProgramRead)
async def create_course_program(
    course_program_in: CourseProgramCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course_program = await course_program_crud.create(session, course_program_in)
    return CourseProgramRead.from_orm(course_program)


@router.put("/{course_program_id}", response_model=CourseProgramRead)
async def update_course_program_put(
    course_program_id: int,
    course_program_in: CourseProgramUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course_program = await get_course_program_by_id(session, course_program_id)
    if not course_program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course program with id {course_program_id} not found",
        )
    updated_course_program = await course_program_crud.update(
        session,
        course_program.id,
        course_program_in,
        partial=False,
    )
    return CourseProgramRead.from_orm(updated_course_program)


@router.patch("/{course_program_id}", response_model=CourseProgramRead)
async def update_course_program_patch(
    course_program_id: int,
    course_program_in: CourseProgramUpdatePartial,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course_program = await get_course_program_by_id(session, course_program_id)
    if not course_program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course program with id {course_program_id} not found",
        )
    updated_course_program = await course_program_crud.update(
        session,
        course_program.id,
        course_program_in,
        partial=True,
    )
    return CourseProgramRead.from_orm(updated_course_program)


@router.delete("/{course_program_id}", response_model=CourseProgramRead)
async def delete_course_program(
    course_program_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    course_program = await get_course_program_by_id(session, course_program_id)
    if not course_program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course program with id {course_program_id} not found",
        )
    await course_program_crud.remove(session, course_program_id)
    return CourseProgramRead.from_orm(course_program)
