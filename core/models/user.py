from sqlalchemy.orm import Mapped, mapped_column
from fastapi_users.db import SQLAlchemyBaseUserTable

from .base import BaseModel
from .mixins.id_int_pk import IdIntPkMixin


class User(BaseModel, IdIntPkMixin, SQLAlchemyBaseUserTable[int]):
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    father_name: Mapped[str] = mapped_column()
