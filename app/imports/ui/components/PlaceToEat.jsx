import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Row, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Star, StarFill } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PlaceToEat = ({ place }) => {
  const [isStarClicked, setIsStarClicked] = useState(false);

  const handleStarClick = () => {
    setIsStarClicked(!isStarClicked);
  };

  return (
    <Card className="h-100">
      <Container className="py-1" onClick={handleStarClick}>
        {isStarClicked ? <StarFill /> : <Star />}
      </Container>
      <Nav.Link as={NavLink} to={`/menu/${place._id}`}>
        <Card.Header className="text-center">
          <Image src={place.image} height={150} />
        </Card.Header>
        <Card.Body>
          <Row className="text-center">
            <Card.Title>{place.name}</Card.Title>
            <Card.Subtitle className="py-2">{place.location}</Card.Subtitle>
            {place.hours.split('\n').map((line, index) => (<Card.Subtitle key={index}>{line}</Card.Subtitle>
            ))}
          </Row>
        </Card.Body>
      </Nav.Link>
    </Card>
  );
};

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
