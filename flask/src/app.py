from flask import Flask, jsonify
from openai import OpenAI
from flask import request, Response
from fetch import get_page_html
from news import parse_html_file
import asyncio

app = Flask(__name__)

@app.route('/api/hello')
def hello_world():
    return jsonify(message="Hello, World from Flask!")

@app.route('/api/news/summary', methods=['GET'])
def stream_gpt_summary():
    # Extract the URL from the request
    url = request.args.get("url", "No URL provided")

    # Generator function for streaming
    def generate_summary():
        # Fetch HTML content asynchronously
        html_content = asyncio.run(get_page_html(url))
        content = parse_html_file(html_content)

        # GPT client setup
        client = OpenAI()

        # Send initial prompt
        # yield "Fetching summary...\n"  # Send initial message to client

        # Generate GPT completion
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": "Summarize the following news article in a couple of paragraphs.",
                },
                {"role": "user", "content": content},
            ],
            stream=True,  # Enable OpenAI streaming
        )

        # Stream the response
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content

    return Response(generate_summary(), content_type='text/plain')  # Stream as plain text

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)
