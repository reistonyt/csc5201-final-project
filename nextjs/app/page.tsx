// External Libraries
import { Container, Row, Col } from 'react-bootstrap';  // React Bootstrap components

// Internal Components
import NavigationBar from '@/components/NavigationBar';  // Navigation bar component

function Home() {
  return (
    <>
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <Row>
          <Col>
            <h1 className="display-1 text-center">Welcome to NewsAgg!</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
