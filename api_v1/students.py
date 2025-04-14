from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from core.models.user import User
from core.models import db_helper
from core.schemas.user import UserRead
from core.schemas.pagination import PaginationResponse

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/", response_model=PaginationResponse[UserRead])
async def get_students(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    total = await session.scalar(
        select(func.count()).select_from(User).where(User.is_student.is_(True))
    )

    result = await session.execute(
        select(User)
        .where(User.is_student.is_(True))
        .order_by(User.id)
        .offset(offset)
        .limit(limit)
    )
    students = result.scalars().all()

    if not students:
        raise HTTPException(status_code=404, detail="No students found")

    return PaginationResponse(
        total=total or 0,
        items=[UserRead.model_validate(s) for s in students],
    )
