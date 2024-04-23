from flask import Flask, jsonify
from openai import OpenAI

app = Flask(__name__)

@app.route('/api/hello')
def hello_world():
    return jsonify(message="Hello, World from Flask!")

@app.route('/api/news/summary')
def gpt():
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", 
             "content": "Summarize the following news article in a couple of paragraphs. \
                The end user is a client who is looking for a quick, yet informative summary. \
                If the provided content does not appear like a news article, please respond with \
                'Not a news article.'"},
            {"role": "user", "content": "What is the meaning of life?"},
        ],
    )
    
    return jsonify(message=completion.choices[0].message.content)

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)
