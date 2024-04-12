import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Row, Col } from 'react-bootstrap';

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
      </Row>
      <Row className="text-start">
        <Col>
          <Card.Subtitle id="monday">Monday: {place.monday}</Card.Subtitle>
          <Card.Subtitle id="tuesday">Tuesday: {place.tuesday}</Card.Subtitle>
          <Card.Subtitle id="wednesday">Wednesday: {place.wednesday}</Card.Subtitle>
          <Card.Subtitle id="thursday">Thursday: {place.thursday}</Card.Subtitle>
        </Col>
        <Col>
          <Card.Subtitle id="friday">Friday: {place.friday}</Card.Subtitle>
          <Card.Subtitle id="saturday">Saturday: {place.saturday}</Card.Subtitle>
          <Card.Subtitle id="sunday">Sunday: {place.sunday}</Card.Subtitle>
        </Col>
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
    monday: PropTypes.string,
    tuesday: PropTypes.string,
    wednesday: PropTypes.string,
    thursday: PropTypes.string,
    friday: PropTypes.string,
    saturday: PropTypes.string,
    sunday: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PlaceToEat;
