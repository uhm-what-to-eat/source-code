import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../../api/stuff/Stuff';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEat from '../../components/PlaceToEat';

/* Renders a table containing all of the Stuff documents. Use <Vendor> to render each row. */
const CampusCenter = () => {
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
  const places = [{
    name: 'Campus Center Food Court', image: '../images/FoodCourt.jpg', location: 'Campus Center', hours: 'Mon-Fri 7am-2pm',
  }, {
    name: 'Subway', image: '../images/Subway.jpg', location: 'Campus Center', hours: 'Mon & Fri 8am-5pm\nTue-Thu 8am-6pm',
  }];
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
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {places.map((place, index) => (<Col key={index}><PlaceToEat place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CampusCenter;
