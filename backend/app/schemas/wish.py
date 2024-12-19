from pydantic import BaseModel

class Wish(BaseModel):
    id: str
    name: str

class WishWrapper(BaseModel):
    name: str