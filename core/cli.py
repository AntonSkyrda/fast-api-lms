import asyncio
import contextlib
import os
from invoke import task
from dotenv import load_dotenv

from api_v1.dependencies.authentication.users import get_users_db
from api_v1.dependencies.authentication.user_manager import get_user_manager
from core.authentication.user_manager import UserManager
from core.models import db_helper, User
from core.schemas.user import UserCreate

load_dotenv()

get_user_db_context = contextlib.asynccontextmanager(get_users_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


async def create_user(
    user_manager: UserManager,
    user_create: UserCreate,
) -> User:
    user = await user_manager.create(
        user_create=user_create,
        safe=False,
    )
    return user


@task
def createsuperuser(
    c,
    email=None,
    password=None,
    is_active=True,
    is_superuser=True,
    is_verified=True,
):
    if not email:
        email = os.getenv("DEFAULT_EMAIL") or input("Enter email: ")
    if not password:
        password = os.getenv("DEFAULT_PASSWORD") or input("Enter password: ")

    async def _create():
        user_create = UserCreate(
            email=email,
            password=password,
            is_active=is_active,
            is_superuser=is_superuser,
            is_verified=is_verified,
            first_name="Admin",
            last_name="Admin",
            father_name="Admin",
            is_teacher=True,
            is_student=False,
        )

        async with db_helper.session_factory() as session:
            async with get_user_db_context(session) as users_db:
                async with get_user_manager_context(users_db) as user_manager:
                    user = await create_user(
                        user_manager=user_manager,
                        user_create=user_create,
                    )

    asyncio.run(_create())
