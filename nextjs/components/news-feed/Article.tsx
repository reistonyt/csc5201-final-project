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
  }
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className='card-title'>{article.title}</CardTitle>
        <CardSubtitle className='card-text'>Source: {article.source}</CardSubtitle>
        <CardSubtitle className='card-text'>Published Date: {article.published_at}</CardSubtitle>
      </CardHeader>
      <CardBody>
        <div className='my-2'>
          <Button variant="primary">Summarize</Button>
        </div>
        <CardLink className='card-text' href={article.url}>Read More</CardLink>
      </CardBody>
    </Card>
  )
}

export default Article;
