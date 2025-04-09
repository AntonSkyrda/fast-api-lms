from fastapi import APIRouter

from .dependencies.authentication.fast_api_users_router import fastapi_users_router
from core.config import settings
from core.schemas.user import UserRead, UserUpdate

router = APIRouter(prefix=settings.users, tags=["Users"])


router.include_router(
    fastapi_users_router.get_users_router(
        UserRead,
        UserUpdate,
    )
)
