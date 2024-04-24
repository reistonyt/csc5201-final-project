import React from 'react';

import { Container, Row, Col, CardBody } from 'react-bootstrap';

import { Card, CardHeader, CardTitle, CardSubtitle, CardText, CardLink, Button } from 'react-bootstrap';

import '@/styles/news-feed/Article.css';

interface ArticleProps {
  article: {
    source: string,
    published_at: string,
    title: string,
    url: string,
  };
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  // Event handler for summarizing the article
  const summarizeArticle = () => {
    console.log(`Summarizing article: ${article.title}`);
  };

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className='card-title'>{article.title}</CardTitle>
        <CardSubtitle className='card-text mt-2'>Source: {article.source}</CardSubtitle>
        <CardSubtitle className='card-text mt-2'>Published Date: {article.published_at}</CardSubtitle>
      </CardHeader>
      <CardBody>
        <CardText className='card-text'>Summary: </CardText>
        <CardLink className='card-text' href={article.url} target='_blank' rel='noopener noreferrer'>Read More</CardLink>
        <div className='mt-4'>
          <Button onClick={summarizeArticle}>Summarize</Button>
        </div>
      </CardBody>
    </Card>
  )
};

export default Article;
