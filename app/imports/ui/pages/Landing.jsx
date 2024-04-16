import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaceToEat from '../components/PlaceToEat';
import LoadingSpinner from '../components/LoadingSpinner';
import { AllVendors } from '../../api/allvendors/collection';

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const { ready, placesToEat } = useTracker(() => {
    const subscription = Meteor.subscribe(AllVendors.userPublicationName); // Assuming you have a publication set up for the aggregated collection
    const rdy = subscription.ready();
    const places = AllVendors.collection.find({}).fetch(); // Access the aggregated collection
    return {
      placesToEat: places,
      ready: rdy,
    };
  }, []);

  const renderContent = () => {
    if (currentUser) {
      return (ready ? (
        <Container className="py-3">
          <Row className="align-middle text-center">
            <Col xs={4} />
            <Col xs={4}>
              <h1>Welcome Back {currentUser.username}!</h1>
              <h2>Top Eats For Today: </h2>
            </Col>
          </Row>
          <Row>
            {placesToEat.map((place) => (<Col key={place._id}><PlaceToEat place={place} /></Col>))}
          </Row>
        </Container>
      ) : <LoadingSpinner />);
    }
    return (
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
  };

  return (
    <Container id="landing-page" fluid className="py-3">
      {renderContent()}
    </Container>
  );
};

export default Landing;
