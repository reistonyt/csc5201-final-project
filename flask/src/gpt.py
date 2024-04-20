from openai import OpenAI
from dotenv import load_dotenv
import os

def get_completion(prompt):
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    
    return completion.choices[0].message.content

print(get_completion("What is the meaning of life?"))

if __name__ == "__main__":
    load_dotenv()
