"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Article from '@/components/news-feed/Article';
import '@/styles/news-feed/NewsFeed.css';

async function getNewsFeed(page = 1) {
  const response = await axios.get('/api/news', {
    params: { page },
  });

  return response.data;
}

function NewsFeed () {
  const [articles, setArticles] = useState([]); // Use state to store fetched articles
  const [loading, setLoading] = useState(true); // Loading state to indicate data fetch

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNewsFeed(); // Fetch news feed data
        setArticles(newsData.articles); // Assuming the response has an "articles" field
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchNews(); // Fetch data when component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

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
      <Container fluid className="d-flex justify-content-center">
        <Row>
          <Col>
            <h1 className="display-1 text-center my-5">News Feed</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </Container>
    </>
  );
};

export default NewsFeed;
