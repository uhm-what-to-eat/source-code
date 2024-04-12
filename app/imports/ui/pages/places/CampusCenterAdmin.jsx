import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CCVendors } from '../../../api/ccvendor/CCVendors';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEatAdmin from '../../components/PlaceToEatAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CampusCenterAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, ccvendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to CCVendors documents.
    const subscription = Meteor.subscribe(CCVendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const ccvendorItems = CCVendors.collection.find({}).fetch();
    return {
      ccvendor: ccvendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Campus Center</h2>
          </Col>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="success" className="m-1" disabled>Campus Center</Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/pp">Paradise Palms</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/ft">Food Trucks</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/hh">Hemenway Hall</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/rd">Residential Dining</Nav.Link>
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {ccvendor.map((place) => (
          <Col key={place._id}>
            <div className="vendor-wrapper">
              <PlaceToEatAdmin place={place} />
              <Row className="text-start">
                <Col><Button variant="danger">Remove</Button></Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CampusCenterAdmin;
