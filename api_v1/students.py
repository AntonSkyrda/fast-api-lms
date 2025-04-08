from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from core.models.user import User
from core.models import db_helper
from core.schemas.user import UserRead


router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/", response_model=list[UserRead])
async def get_students(session: AsyncSession = Depends(db_helper.session_getter)):
    result = await session.execute(select(User).where(User.is_student.is_(True)))
    students = result.scalars().all()
    if not students:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No students found",
        )
    return students
