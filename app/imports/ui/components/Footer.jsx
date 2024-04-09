import React from 'react';
import { Col, Container, Row, Nav, Image, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col xs={3}>
          <Row><Image src="images/landing-page-log-in.png" style={{ height: '100px', width: '100px' }} /></Row>
          <Row style={{ paddingTop: '20px' }}>
            <strong>Finding your foody desires.</strong>
          </Row>
        </Col>
        <Col xs={4}>
          <Row style={{ paddingTop: '40px' }}> <strong>Want to keep updated with the new vendors <br /> around campus?</strong>
          </Row>
          <Row style={{ paddingTop: '20px', marginRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Use a container with flex display */}
              <input type="text" placeholder="Enter Email Address" style={{ width: '200px', marginRight: '10px' }} /> {/* Input field */}
              <Button id="subscribe-button" style={{ fontSize: '14px', padding: '5px 10px' }}>Subscribe!</Button>
            </div>
          </Row>
        </Col>
        <Col xs={5}>
          <Container className="text-center">
            <Row style={{ paddingTop: '40px' }} className="text-center">
              <Col>
                <Nav className="me-auto">
                  <Nav.Link id="big-white-links"><FaFacebook /></Nav.Link>
                  <Nav.Link id="big-white-links"><FaTwitter /></Nav.Link>
                  <Nav.Link id="big-white-links"><FaPinterest /></Nav.Link>
                  <Nav.Link id="big-white-links"><FaInstagram /></Nav.Link>
                </Nav>
              </Col>
              <Col>
                Contact Us <br />
                <strong>8081234567</strong>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row style={{ paddingTop: '30px' }}>
        <hr />
        <Row>
          <Col xs={2}><strong style={{ fontSize: '10px' }} className="align-text-end">TERMS AND CONDITIONS</strong></Col>
        </Row>
      </Row>
    </Container>
  </footer>
);

export default Footer;
