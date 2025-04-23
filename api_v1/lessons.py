from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.crud.lessons import (
    lesson_crud,
    get_lesson_by_id,
    create_lesson_with_groups,
    get_lessons,
)
from core.schemas.lessons import LessonCreate, LessonRead
from core.schemas.pagination import PaginationResponse

router = APIRouter(prefix="/lessons", tags=["Lessons"])


@router.post("/", response_model=LessonRead)
async def create_lesson(
    lesson_in: LessonCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    lesson = await create_lesson_with_groups(session, lesson_in)
    return LessonRead.from_orm(lesson)


@router.get("/", response_model=PaginationResponse[LessonRead])
async def list_lessons(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    total, lessons = await get_lessons(session, offset=offset, limit=limit)
    return PaginationResponse(
        total=total,
        items=[LessonRead.from_orm(l) for l in lessons],
    )


@router.get("/{lesson_id}/", response_model=LessonRead)
async def retrieve_lesson(
    lesson_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    lesson = await get_lesson_by_id(session, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return LessonRead.from_orm(lesson)


@router.delete("/{lesson_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lesson(
    lesson_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    lesson = await get_lesson_by_id(session, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    await lesson_crud.remove(session, lesson.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
