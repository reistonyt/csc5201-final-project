from readability import Document

def extract_and_save_content(input_filepath, output_filepath):
    # Open and read the HTML content from the input file
    with open(input_filepath, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Process the HTML with Readability
    doc = Document(html_content)
    article_html = doc.summary()
    article_title = doc.title()

    # Save the title and content to another file
    with open(output_filepath, 'w', encoding='utf-8') as file:
        file.write(f"Title: {article_title}\n\n")
        file.write("Content:\n")
        # from lxml.html import fromstring
        # file.write(fromstring(article_html).text_content())

    print("Content extracted and saved successfully.")

# Example file paths
input_filepath = 'saved_page.html'
output_filepath = 'output.txt'

# Extract content and save it
extract_and_save_content(input_filepath, output_filepath)
