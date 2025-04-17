from pydantic import BaseModel


class CourseProgramBase(BaseModel):
    title: str
    order: int
    count_hours: int
    course_id: int


class CourseProgramRead(CourseProgramBase):
    id: int


class CourseProgramCreate(CourseProgramBase):
    pass


class CourseProgramUpdate(CourseProgramBase):
    pass


class CourseProgramUpdatePartial(BaseModel):
    title: str | None
    order: int | None
    count_hours: int | None
    course_id: int | None
