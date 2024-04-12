import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PPVendors } from '../../../api/ppvendor/PPVendors';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEatAdmin from '../../components/PlaceToEatAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ParadisePalmsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, ppvendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(PPVendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const ppvendorItems = PPVendors.collection.find({}).fetch();
    return {
      ppvendor: ppvendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Paradise Palms Vendors</h2>
          </Col>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/adminCC">Campus Center Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1" disabled>Paradise Palms Vendors</Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/ft">Food Trucks Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/hh">Hemenway Hall Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/rd">Residential Dining Vendors</Nav.Link>
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {ppvendor.map((place) => (<Col key={place._id}><PlaceToEatAdmin place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ParadisePalmsAdmin;
