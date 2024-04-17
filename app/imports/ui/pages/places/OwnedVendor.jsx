import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../../api/vendor/Vendors';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEatEdit from '../../components/PlaceToEatEdit';

/* Renders a table containing all of the Campus Center documents. */
const OwnedVendor = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Vendor documents.
    const subscription = Meteor.subscribe(Vendors.vendorPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Vendor documents
    const vendorItems = Vendors.collection.find({}).fetch();
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
            <h2 className="fw-bold">Your Vendors</h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {vendor.map((place) => (<Col key={place._id}><PlaceToEatEdit place={place} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OwnedVendor;
