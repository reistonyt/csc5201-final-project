import React from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';


import '@/styles/news-feed/NewsFeed.css';

async function getNewsFeed(page: number = 1) {
  const response = await axios.get('/api/news-feed', {
    params: { page },
  });

  return response.data;
};

function NewsFeed() {
  return (
    <>
      <Container fluid className="d-flex justify-content-center">
        <Row>
          <Col>
            <h1 className="display-1 text-center mt-5">News Feed</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default NewsFeed;
