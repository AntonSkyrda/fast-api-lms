from typing import Generic, TypeVar, Type, Sequence

from fastapi import HTTPException
from sqlalchemy import select, update, delete, func, or_
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
        limit: int = 10,
        offset: int = 0,
        search: str | None = None,
        search_fields: list[str] | None = None,
    ) -> tuple[int, Sequence[ModelType]]:
        stmt = select(self.model)

        if search and search_fields:
            filters = []
            for field_name in search_fields:
                field = getattr(self.model, field_name, None)
                if field is not None:
                    filters.append(field.ilike(f"%{search}%"))
            if filters:
                stmt = stmt.where(or_(*filters))

        total = await session.scalar(select(func.count()).select_from(stmt.subquery()))

        result = await session.execute(stmt.offset(offset).limit(limit))
        items = result.scalars().all()

        return total or 0, items

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
