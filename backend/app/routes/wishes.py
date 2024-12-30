import json
import shortuuid
from fastapi import APIRouter, status
from app.schemas import wish
from app.supabase_client import supabase

router = APIRouter(
    prefix='/wishes',
    tags=['Wishes']
)

# Getting all the wishes from DB
@router.get(
    '/',
    summary='Get all wishes',
    response_model=list[wish.Wish],
    status_code=status.HTTP_200_OK
)
def get_wishes():
    data = supabase.table('wishes').select('*').execute()
    data_json = json.loads(data.json())
    return data_json['data']

# Get a spesific wish from the ID
@router.get(
    '/{wish_id}',
    summary='Get a wish by ID',
    response_model=wish.Wish,
    status_code=status.HTTP_200_OK
)
def get_wish_from_id(wish_id):
    data = supabase.table('wishes').select('*').eq('id', wish_id).execute()
    data_json = json.loads(data.json())
    return data_json['data'][0]

# Create a new wish
@router.post(
    '/',
    summary='Create a new wish',
    response_model=wish.Wish,
    status_code=status.HTTP_201_CREATED
)
def create_wish(wish_wrapper: wish.WishWrapper):
    wish_id = shortuuid.ShortUUID().random(length=5)

    new_wish = wish.Wish(id=wish_id, name=wish_wrapper.name)
    body_json = json.loads(new_wish.json())
    data = supabase.table('wishes').insert(body_json).execute()

    data_json = json.loads(data.json())
    return data_json['data'][0]