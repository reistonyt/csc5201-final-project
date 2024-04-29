"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import Article from '@/components/news-feed/Article';
import '@/styles/news-feed/NewsFeed.css';

async function getNewsFeed(page = 1) {
  const response = await axios.get('/api/news', {
    params: { page },
  });

  return response.data;
}

function NewsFeed () {
  const [articles, setArticles] = useState<any[]>([]); // Use state to store articles
  const [page, setPage] = useState<number>(1); // Use state to store current page
  const [loading, setLoading] = useState(true); // Loading state to indicate data fetch

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNewsFeed(page); // Fetch news data
        setArticles((prevArticles) => [...prevArticles, ...newsData.articles]); // Update articles state
      } catch (error) {
        console.error('Error fetching news:', error);
        // use fake data for testing
        setArticles([
          {
            source: 'Fake News',
            published_at: '2021-01-01',
            title: 'Fake News Article',
            url: 'https://example.com',
          },
        ]);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchNews(); // Fetch data when component mounts
  }, [page]); // Re-fetch data when page state changes

  if (loading) {
    // Display a loading spinner while fetching data
    return (
      <Container fluid className="d-flex justify-content-center">
        <Spinner className='mt-5' animation="border" role="status">
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <Container className='my-5'>
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col>
              <h1 className="display-1 text-center">News Feed</h1>
            </Col>
          </Row>
        </Container>
        <Container>
          {articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
          <div>
            <Button variant="primary" onClick={() => setPage(page + 1)}>
              Load More
            </Button>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default NewsFeed;
