import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';
import PlaceToEat from '../components/PlaceToEat';

const Favorites = () => {
  const { ready, vendor } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const rdy = subscription.ready();

    let vendorItems = [];
    const user = Meteor.user();
    if (user) {
      vendorItems = Vendors.collection.find({ favorites: user.username }).fetch();
    }
    return {
      vendor: vendorItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">Your Favorites</h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {vendor.map((place) => (<Col key={place._id}><PlaceToEat place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Favorites;
