import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '@/styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <Container fluid className='footer bg-dark text-light'>
      <Row className="justify-content-md-center">
        <Col md={4} className="text-center">
          <div>
            © {new Date().getFullYear()} Newegg
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
