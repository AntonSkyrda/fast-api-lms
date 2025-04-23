from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from .dependencies.authentication.fast_api_users_router import fastapi_users_router
from .dependencies.authentication.backend import authentication_backend

from .auth import router as auth_router
from .users import router as users_router
from .groups import router as groups_router
from .courses import router as courses_router
from .students import router as students_router
from .teachers import router as teachers_router
from .course_programs import router as course_programs_router
from .lessons import router as lessons_router

http_bearer = HTTPBearer(auto_error=False)

router = APIRouter(
    dependencies=[Depends(http_bearer)],
)

router.include_router(router=auth_router)
router.include_router(router=users_router)
router.include_router(router=groups_router)
router.include_router(router=courses_router)
router.include_router(router=students_router)
router.include_router(router=teachers_router)
router.include_router(router=course_programs_router)
router.include_router(router=lessons_router)
