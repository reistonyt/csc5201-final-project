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
            print(f"common.py - query_handler - Error: {e}")
            result = None
        finally:
            conn.close()
        return result
    return wrapper

@query_handler
def query(conn, sql_query, params = None, json_output = False):
    with conn.cursor() as cursor:
        cursor.execute(sql_query, params)

        # When insert, update or delete
        if cursor.description is None:
            conn.commit()
            return cursor.rowcount
        
        # When select: return as json or list
        if json_output:
            headers = [desc[0] for desc in cursor.description]
            result = cursor.fetchall()
            return [dict(zip(headers, row)) for row in result]
            
        return cursor.fetchall()
