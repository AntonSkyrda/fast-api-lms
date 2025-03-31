from fastapi import APIRouter

from .dependencies.authentication.fast_api_users_router import fastapi_users_router
from .dependencies.authentication.backend import authentication_backend

from .auth import router as auth_router

router = APIRouter()

router.include_router(router=auth_router)
