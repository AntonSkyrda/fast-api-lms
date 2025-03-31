from fastapi import APIRouter

from dependencies.authentication.fast_api_users_router import fastapi_users_router
from dependencies.authentication.backend import authentication_backend
from .users.views import router as user_router
from .auth import router as auth_router

router = APIRouter()

router.include_router(router=user_router, prefix="/users")
router.include_router(router=auth_router)
router.include_router(fastapi_users_router.get_auth_router(authentication_backend))
