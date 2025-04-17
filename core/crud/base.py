from typing import Generic, TypeVar, Type

from fastapi import HTTPException
from sqlalchemy import select, update, delete, func
from sqlalchemy.orm import DeclarativeMeta
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel


ModelType = TypeVar("ModelType", bound=DeclarativeMeta)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get_all(
        self,
        session: AsyncSession,
        offset: int = 0,
        limit: int = 10,
    ) -> tuple[int, list[ModelType]]:
        total_result = await session.execute(
            select(func.count()).select_from(self.model)
        )
        total = total_result.scalar_one()

        result = await session.execute(select(self.model).offset(offset).limit(limit))

        return total, list(result.scalars().all())

    async def create(
        self, session: AsyncSession, object_in: CreateSchemaType
    ) -> ModelType:
        object_create = self.model(**object_in.model_dump())

        session.add(object_create)
        await session.commit()
        await session.refresh(object_create)

        return object_create

    async def update(
        self,
        session: AsyncSession,
        object_id: int,
        object_in: UpdateSchemaType,
        partial: bool = True,
    ) -> ModelType:
        values = object_in.model_dump(exclude_unset=partial)

        if not values:
            raise HTTPException(
                status_code=400,
                detail=(
                    "No fields provided for update (PATCH)"
                    if partial
                    else "PUT must include all fields"
                ),
            )

        stmt = (
            update(self.model)
            .where(self.model.id == object_id)
            .values(**values)
            .execution_options(synchronize_session="fetch")
        )
        await session.execute(stmt)
        await session.commit()

        result = await session.execute(
            select(self.model).where(self.model.id == object_id)
        )
        return result.scalar_one()

    async def remove(self, session: AsyncSession, object_id: int) -> None:
        await session.execute(delete(self.model).where(self.model.id == object_id))
        await session.commit()
