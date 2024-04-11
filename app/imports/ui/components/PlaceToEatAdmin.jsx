import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Image, Card, Row, Col, Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PlaceToEat = ({ place }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={place.image} height={150} />
    </Card.Header>
    <Card.Body>
      <Row className="text-center">
        <Card.Title>{place.name}</Card.Title>
        <Card.Subtitle className="py-2">{place.location}</Card.Subtitle>
        <Card.Subtitle id="hours">{place.hours}</Card.Subtitle>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <footer className="blockquote-footer">
            {place.owner}<br />
            <Row className="text-start">
              <Col><Button variant="danger">Remove</Button></Col>
            </Row>
          </footer>
        ) : ''}
      </Row>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
PlaceToEat.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PlaceToEat;
