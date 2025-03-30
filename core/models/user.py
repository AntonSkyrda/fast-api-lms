from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase

from .base import BaseModel
from .mixins.id_int_pk import IdIntPkMixin


if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


class User(BaseModel, IdIntPkMixin, SQLAlchemyBaseUserTable[int]):
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    father_name: Mapped[str] = mapped_column()

    @classmethod
    def get_db(cls, session: AsyncSession) -> SQLAlchemyUserDatabase:
        return SQLAlchemyUserDatabase(session, User)
