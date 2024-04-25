import asyncio
from pyppeteer import launch

async def get_page_html(url):
    browser = None
    page = None
    content = "No content found"

    try:
        # Launch the browser
        browser = await launch(options={'args': ['--no-sandbox']})

        # Open a new browser page
        page = await browser.newPage()

        # Set the browser viewport
        await page.setViewport({'width': 1280, 'height': 800})

        # Set user agent (override the default headless User Agent)
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        )

        # Navigate to the URL
        await page.goto(url, options={'waitUntil': 'domcontentloaded'})

        # Get page content
        content = await page.content()

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        
    finally:
        if page:
            await page.close()  # Ensure the page is closed
        if browser:
            await browser.close()  # Ensure the browser is closed

    return content  # Return the content after cleanup

# Running the async function
if __name__ == '__main__':
    # Set the URL
    url = "https://www.example.com"

    # Run the async function
    asyncio.run(get_page_html(url))
