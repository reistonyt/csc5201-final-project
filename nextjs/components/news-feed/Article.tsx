import React from 'react';

import { useState } from 'react';

import { Container, Row, Col, CardBody } from 'react-bootstrap';

import { Card, CardHeader, CardTitle, CardSubtitle, CardText, CardLink, Button } from 'react-bootstrap';

import Spinner from 'react-bootstrap/Spinner';

import '@/styles/news-feed/Article.css';
import axios from 'axios';

interface ArticleProps {
  article: {
    source: string,
    published_at: string,
    title: string,
    url: string,
  };
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  const [summary, setSummary] = useState('Summary: Not yet generated.');

  const summarizeArticle = async () => {
    setSummary('Summary: Generating summary...');
  
    try {
      const response = await fetch(`/api/news/summary?url=${encodeURIComponent(article.url)}`, {
        method: 'GET',
      });
  
      if (!response.ok || !response.body) {
        throw new Error('Failed to fetch summary');
      }
  
      // read the stream and convert it to text
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setSummary('Summary: ');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setSummary((prevSummary) => prevSummary + chunk);
      }
  
    } catch (error) {
      console.error('Error summarizing article:', error);
      setSummary('Error summarizing article.');
    }
  };
  

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className='card-title'>{article.title}</CardTitle>
        <CardSubtitle className='card-component'>Source: {article.source}</CardSubtitle>
        <CardSubtitle className='card-component'>Published Date: {article.published_at}</CardSubtitle>
      </CardHeader>
      <CardBody>
        <div className='card-component'>
          <CardText>
            {summary.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </CardText>
        </div>
        <div className='card-component'>
          <CardLink href={article.url} target='_blank' rel='noopener noreferrer'>Read More</CardLink>
        </div>
        <div className='d-flex justify-content-center'>
          <Button onClick={summarizeArticle}>Summarize</Button>
        </div>
      </CardBody>
    </Card>
  )
};

export default Article;
