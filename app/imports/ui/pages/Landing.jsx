import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A custom landing page component for different types of users. */
const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const renderContent = () => {
    if (currentUser) {
      // Check if user is logged in and has a specific role or property
      if (currentUser.profile && currentUser.profile.role === 'vendor') {
        // Render content for vendors
        return (
          <>
            <h1>Welcome, {currentUser.username}!</h1>
            <p>You are logged in as a vendor.</p>
            {/* Add vendor-specific content or actions */}
          </>
        );
      }
      // Render content for regular users
      return (
        <Row className="align-middle text-center">
          <Col xs={4} />
          <Col xs={4}>
            <h1>SUPPPP SEXYYYY {currentUser.username}!</h1>
            <p>BOIIIIIIII</p>
          </Col>
        </Row>
      );
    }
    // Render content for non-logged-in users
    return (
      <>
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
            <h2><Link to="/signin" className="link">Login in Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image src="images/landing-page-vendor.png" width="150px" />
            <h1 className="p-2">Do You Want To Sell?</h1>
            <h2><Link to="/signupvendor" className="link">Become A Vendor Here!</Link></h2>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Container id="landing-page" fluid className="py-3">
      {renderContent()}
    </Container>
  );
};

export default Landing;
