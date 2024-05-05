import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendors';
// import { MenuItems } from '../../api/menu/MenuItems';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Menu = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  const { vendor, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Vendors.collection.findOne(_id);
    // console.log(document);
    return {
      vendor: document,
      ready: rdy,
    };
  }, [_id]);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h1>{`${vendor.name}'s Menu!`}</h1>
          </Col>
        </Col>
        <Image src={`${vendor.menuImage}`} style={{ paddingTop: '20px', paddingBottom: '20px' }} />
      </Row>
      <Row>
        <Col>
          <h1>Recommended Items:</h1>
        </Col>
      </Row>
      <ul>
        {vendor.menuItems.map((item) => (
          <li>{`${item.itemName}: ${item.price}`}</li>
        ))}
      </ul>
    </Container>
  ) : <LoadingSpinner />);
};

export default Menu;
