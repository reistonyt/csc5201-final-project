// External Libraries
import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
  
} from 'react-bootstrap';  // React Bootstrap components

// Internal Components and Styles
import '@/styles/NavigationBar.css';  // NavigationBar styles

const NavigationBar: React.FC = () => {  // Adding TypeScript types
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <NavbarBrand href="/">NewsFeed AI</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/news-feed">News Feed</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
