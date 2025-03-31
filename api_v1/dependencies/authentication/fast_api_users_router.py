from fastapi_users import FastAPIUsers

from core.models import User
from core.types.user_id import UserIdType
from .user_manager import get_user_manager
from .backend import authentication_backend


fastapi_users_router = FastAPIUsers[User, UserIdType](
    get_user_manager=get_user_manager,
    auth_backends=authentication_backend,
)
