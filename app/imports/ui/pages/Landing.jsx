import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4} />
      <Col xs={4}>
        <h1>UHM... What To Eat?</h1>
        <h2>Manoa&apos;s One Stop Shop For Mouthwatering Munchies!</h2>
      </Col>
    </Row>
    <Row className="align-middle text-center row p-4">
      <Col xs={4}>
        <Image src="images/landing-page-sign-in-logo.png" width="150px" />
        <h1 className="p-2">Want to see Manoa&apos;s Biggest Munches?</h1>
        <h2><Link to="/signupuser" className="link">Sign Up Now Here!</Link></h2>
      </Col>
      <Col xs={4}>
        <Image src="images/landing-page-log-in.png" width="150px" />
        <h1 className="p-2">Already A Munch?</h1>
        <h2><Link to="/signin" color="dark-green" className="link">Login in Here!</Link></h2>
      </Col>
      <Col xs={4}>
        <Image src="images/landing-page-vendor.png" width="150px" />
        <h1 className="p-2">Do You Want To Sell?</h1>
        <h2><Link to="/signupvendor" className="link">Become A Vendor Here!</Link></h2>
      </Col>
    </Row>
  </Container>
);

export default Landing;
