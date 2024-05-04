import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Row, Nav, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PlaceToEat = ({ place }) => (
  <Nav.Link as={NavLink} to={`/menu/${place._id}`}>
    <Card className="h-100">
      <Card.Header className="text-center">
        <Image src={place.image} height={150} />
      </Card.Header>
      <Card.Body>
        <Row className="text-center">
          <Card.Title>{place.name}</Card.Title>
          <Card.Subtitle className="py-2">{place.location}</Card.Subtitle>
          {place.hours.split('\n').map((line, index) => (
            <Card.Subtitle key={index}>{line}</Card.Subtitle>
          ))}
          <Card.Text>
            {place.category.map((category, index) => <Badge key={index} bg="success" style={{ marginRight: '5px', marginBottom: '5px' }}>{category}</Badge>)}
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  </Nav.Link>
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
    category: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PlaceToEat;
