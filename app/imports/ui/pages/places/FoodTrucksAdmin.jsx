import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FTVendors } from '../../../api/ftvendor/FTVendors';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEatAdmin from '../../components/PlaceToEatAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const FoodTrucksAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, ftvendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(FTVendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the FTVendors documents
    const ftvendorItems = FTVendors.collection.find({}).fetch();
    return {
      ftvendor: ftvendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Food Trucks Vendors</h2>
          </Col>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/adminCC">Campus Center Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/adminPP">Paradise Palms Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1" disabled>Food Trucks Vendors</Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/adminHH">Hemenway Hall Vendors</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/adminRD">Residential Dining Vendors</Nav.Link>
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {ftvendor.map((place) => (<Col key={place._id}><PlaceToEatAdmin place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FoodTrucksAdmin;
