import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL') or os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY') or os.environ.get('SUPABASE_SERVICE_KEY')

if not SUPABASE_SERVICE_KEY or not SUPABASE_URL:
    raise ValueError("Supabase URL and API key must be set in environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY) 