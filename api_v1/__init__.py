from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from core.config import settings

from .dependencies.authentication.fast_api_users_router import fastapi_users_router
from .dependencies.authentication.backend import authentication_backend

from .auth import router as auth_router
from .users import router as users_router


http_bearer = HTTPBearer(auto_error=False)

router = APIRouter(
    dependencies=[Depends(http_bearer)],
)

router.include_router(router=auth_router)
router.include_router(router=users_router)
