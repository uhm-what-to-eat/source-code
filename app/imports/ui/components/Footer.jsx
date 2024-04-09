import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        UH: Manoa ICS314 Spring &apos;24 Final Project
        {' '}
        <br />
        Team JJJ esc.
        {' '}
        <br />
        <a href="https://uhm-what-to-eat.github.io/" target="_blank" rel="noreferrer">
          Github Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
