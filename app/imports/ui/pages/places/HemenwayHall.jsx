import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEat from '../../components/PlaceToEat';
import { HHVendors } from '../../../api/hhvendor/HHVendors';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const HemenwayHall = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, hhvendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(HHVendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const hhvendorItems = HHVendors.collection.find({}).fetch();
    return {
      hhvendor: hhvendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Hemenway Hall</h2>
          </Col>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/cc">Campus Center</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/pp">Paradise Palms</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/ft">Food Trucks</Nav.Link>
          </Button>
          <Button variant="success" className="m-1" disabled>Hemenway Hall</Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/rd">Residential Dining</Nav.Link>
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {hhvendor.map((place) => (<Col key={place._id}><PlaceToEat place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default HemenwayHall;