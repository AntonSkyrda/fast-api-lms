from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from core.models.user import User
from core.models import db_helper
from core.schemas.user import UserRead


router = APIRouter(prefix="/teachers", tags=["Teachers"])


@router.get("/", response_model=list[UserRead])
async def get_teachers(session: AsyncSession = Depends(db_helper.session_getter)):
    result = await session.execute(select(User).where(User.is_teacher.is_(True)))
    teachers = result.scalars().all()
    if not teachers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No teachers found",
        )
    return teachers
