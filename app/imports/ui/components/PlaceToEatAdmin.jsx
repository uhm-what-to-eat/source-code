import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Image, Card, Row, Col, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendors';
import { MenuItems } from '../../api/menu/MenuItems';

const removeVendor = (vendor) => {
  Vendors.collection.remove(vendor._id);
  const menuId = MenuItems.collection.find({ vendorName: vendor.name })._id;
  MenuItems.collection.remove(menuId);
};
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PlaceToEatAdmin = ({ place }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={place.image} height={150} />
    </Card.Header>
    <Card.Body>
      <Row className="text-center">
        <Nav.Link as={NavLink} to={`/menu/${place._id}`}>
          <Card.Title>{place.name}</Card.Title>
        </Nav.Link>
        <Card.Subtitle className="py-2">{place.location}</Card.Subtitle>
        {place.hours.split('\n').map((line, index) => (
          <Card.Subtitle key={index}>{line}</Card.Subtitle>
        ))}
      </Row>
      <Row className="text-center pt-3">
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <footer className="blockquote-footer">
            {place.owner}<br />
            <Row className="text-start pt-1">
              <Col><Button variant="danger" onClick={() => removeVendor(place)}>Remove</Button></Col>
            </Row>
          </footer>
        ) : ''}
      </Row>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
PlaceToEatAdmin.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PlaceToEatAdmin;
