import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Image, Card, Row, Nav, Badge, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Star, StarFill } from 'react-bootstrap-icons';
import { addToFavorites, removeFromFavorites } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PlaceToEat = ({ place }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const [isFavorited, setIsFavorited] = useState(place.favorites.includes(currentUser?.username));

  const handleStarClick = () => {
    if (!isFavorited) {
      Meteor.call(addToFavorites, { vendorId: place._id, username: currentUser.username }, (error) => {
        if (!error) {
          setIsFavorited(true);
        } else {
          console.error('Error adding to favorites:', error);
        }
      });
    } else {
      Meteor.call(removeFromFavorites, { vendorId: place._id, username: currentUser.username }, (error) => {
        if (!error) {
          setIsFavorited(false);
        } else {
          console.error('Error removing from favorites:', error);
        }
      });
    }
  };

  return (
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
      <Container className="py-1" onClick={handleStarClick}>
        {isFavorited ? <StarFill /> : <Star />}
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
    favorites: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PlaceToEat;
