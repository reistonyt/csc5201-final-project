from newspaper import Article

def parse_html_file(filepath):
    # Create an Article object
    article = Article('')

    # Load HTML content from file
    with open(filepath, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Set the HTML content of the article
    article.set_html(html_content)

    # Parse the article
    article.parse()

    # Print the article title and text
    print("Title:", article.title)
    print("Text:", article.text)

    return article.title, article.text

# Example file path
filepath = 'saved_page.html'

# Parse HTML content from file
title, text = parse_html_file(filepath)
