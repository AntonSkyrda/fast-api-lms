from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint

from .base import BaseModel


lesson_group_association_table = Table(
    "lesson_group_association",
    BaseModel.metadata,
    Column(
        "lesson_id",
        ForeignKey("lesson.id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    ),
    Column(
        "group_id",
        ForeignKey("group.id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    ),
    UniqueConstraint("group_id", "lesson_id", name="idx_uniq_lesson_group"),
)
