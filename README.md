
## Table of Contents
- [Project Details](#1-project-details)
- [Instructions to Run the App](#2-instructions-to-run-the-app)
- [API Documentation](#3-api-documentation)

### 1. Project Details
- **Name**: News Article Aggregator & Summarizer (thinking of a cooler name)
- **Purpose**: Aggregate news feeds from various news providers and use OpenAI's APIs to provide content summaries. This tool aims to streamline the consumption of news by delivering succinct summaries of articles from a multitude of sources.

### 2. Instructions to Run the App
1. Clone the app.
2. Run `[docker compose up](https://docs.docker.com/compose/)`. Once Docker Compose has finished initializing the app, it can be accessed at `localhost` in a web browser.
3. This app requires several environment variables to function properly:
    - `DB_NAME`: Database name.
    - `DB_USER`: Database username.
    - `DB_PASSWORD`: Database password.
    - `DB_HOST`: Database IP / host.
    - `DB_PORT`: Database port.
    - `NEWSAPI_KEYS`: Obtain your News API key from [NewsAPI](https://newsapi.org/). You can specify more than one in a comma-separated list (`key1, key2, key3`).
    - `OPENAI_API_KEY`: Obtain your OpenAI key from [OpenAI Platform](https://platform.openai.com/).
    - `NODE_ENV`: Set to "production" if the environment is a production environment. If this is not set, you must build the Next.js app.

### 3. API Documentation

This section outlines the public routes available in the application, each serving specific functions.

#### Home Page
- **Endpoint**: `/`
  - **Description**: Serves as the root of the web application, displaying the home page.

#### News Feed
- **Endpoint**: `/news-feed`
  - **Description**: Displays the news feed where users can browse through various news articles.

#### Admin Statistics
- **Endpoint**: `/admin-statistics`
  - **Description**: Presents a table showing the usage statistics for each route within the application.

#### News Information API
- **Endpoint**: `/api/news`
  - **Method**: GET
  - **Query Parameters**:
    - `page`: Specifies the page number of news articles to retrieve (ranging from 0 to n).
  - **Description**: Retrieves paginated information about news articles. Append the `page` query parameter with a desired page number to fetch a specific page of news articles.

#### News Summary API
- **Endpoint**: `/api/news/summary`
  - **Method**: GET
  - **Query Parameters**:
    - `url`: The URL of the news article for which a summary is requested.
  - **Description**: Provides a summary of a specific news article. Append the `url` query parameter with the article's URL to receive its summary.