# from pydantic import BaseModel, ConfigDict
#
#
# class UserBase(BaseModel):
#     email: str
#     password: str
#     first_name: str
#     last_name: str
#     father_name: str
#
#
# class UserCreate(UserBase):
#     pass
#
#
# class User(UserBase):
#     model_config = ConfigDict(from_attributes=True)
#
#     id: int
