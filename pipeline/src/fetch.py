import asyncio
from pyppeteer import launch

async def save_page_html(url, filepath):
    # Launch the browser
    browser = await launch(options={'args': ['--no-sandbox']})
    
    # Open a new browser page
    page = await browser.newPage()
    
    # Set the browser viewport
    await page.setViewport({'width': 1280, 'height': 800})
    
    # Set user agent (override the default headless User Agent)
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3')
    
    
    # Navigate to the URL
    await page.goto(url, options={'waitUntil': 'domcontentloaded'})

    # await page.waitForSelector('.paragraph')


    # Get page content
    content = await page.content()
    # Save the HTML to a file
    with open(filepath, 'w') as f:
        f.write(content)

    # Close the browser
    await browser.close()

# Set the URL and the file path
url = 'https://www.cnn.com/2024/04/15/tech/meta-quest-vr-education/index.html'
# url = "https://www.example.com"
filepath = 'saved_page.html'

# Run the async function
asyncio.get_event_loop().run_until_complete(save_page_html(url, filepath))
