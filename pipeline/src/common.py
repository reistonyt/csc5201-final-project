import os
import psycopg2
from functools import wraps
import json

def query_handler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=5432
        )
        try:
            return func(conn, *args, **kwargs)
        except Exception as e:
            print(f"Database query failed: {e}")
            result = None
        finally:
            conn.close()
        return result
    return wrapper

@query_handler
def query(conn, query):
    with conn.cursor() as cursor:
        cursor.execute(query)
        headers = [desc[0] for desc in cursor.description]
        result = cursor.fetchall()
        data = [dict(zip(headers, row)) for row in result]
    return data
