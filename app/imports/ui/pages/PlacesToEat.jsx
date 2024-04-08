import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const PlacesToEat = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Places To Eat</h2>
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
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default PlacesToEat;
