from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint

from .base import BaseModel


course_group_association_table = Table(
    "course_group_association",
    BaseModel.metadata,
    Column("course_id", ForeignKey("course.id"), primary_key=True, nullable=False),
    Column("group_id", ForeignKey("group.id"), primary_key=True, nullable=False),
    UniqueConstraint("group_id", "course_id", name="idx_unique_course_group"),
)
