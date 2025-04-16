from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from core.models.user import User
from core.models import db_helper
from core.schemas.user import UserRead
from core.schemas.pagination import PaginationResponse

router = APIRouter(prefix="/teachers", tags=["Teachers"])


@router.get("/", response_model=PaginationResponse[UserRead])
async def get_teachers(
    search: str | None = Query(None, description="Search by name, surname"),
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(db_helper.session_getter),
):
    base_stmt = select(User).where(User.is_teacher.is_(True))

    if search:
        base_stmt = base_stmt.where(
            or_(
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
            )
        )

    total_stmt = select(func.count()).select_from(base_stmt.subquery())
    total = await session.scalar(total_stmt)

    result = await session.execute(
        base_stmt.order_by(User.id).offset(offset).limit(limit)
    )
    teachers = result.scalars().all()

    return PaginationResponse(
        total=total or 0,
        items=[UserRead.model_validate(t) for t in teachers],
    )
