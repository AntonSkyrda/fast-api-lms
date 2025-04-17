from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.crud.base import CRUDBase
from core.models.course_program import CourseProgram
from core.schemas.course_programs import CourseProgramCreate, CourseProgramUpdate


course_program_crud = CRUDBase[CourseProgram, CourseProgramCreate, CourseProgramUpdate](
    CourseProgram
)


async def get_course_program_by_id(
    session: AsyncSession, course_program_id: int
) -> CourseProgram | None:
    result = await session.execute(
        select(CourseProgram).where(CourseProgram.id == course_program_id)
    )

    return result.scalar_one_or_none()
