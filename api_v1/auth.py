from fastapi import APIRouter

from core.config import settings
from core.schemas.user import UserRead, UserCreate

from .dependencies.authentication.fast_api_users_router import fastapi_users_router
from .dependencies.authentication.backend import authentication_backend

router = APIRouter(
    prefix=settings.auth,
    tags=["Auth"],
)


# /login
# /logout
router.include_router(
    router=fastapi_users_router.get_auth_router(authentication_backend)
)

# /register
router.include_router(
    fastapi_users_router.get_register_router(
        UserRead,
        UserCreate,
    )
)
