from pydantic import BaseModel, ConfigDict


class CourseProgramBase(BaseModel):
    title: str
    order: int
    count_hours: int
    course_id: int


class CourseProgramRead(CourseProgramBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class CourseProgramCreate(CourseProgramBase):
    pass


class CourseProgramUpdate(CourseProgramBase):
    pass


class CourseProgramUpdatePartial(BaseModel):
    title: str | None = None
    order: int | None = None
    count_hours: int | None = None
    course_id: int | None = None
