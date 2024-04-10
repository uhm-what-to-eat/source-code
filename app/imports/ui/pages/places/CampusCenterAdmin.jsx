import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CCVendors } from '../../../api/ccvendor/CCVendors';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaceToEat from '../../components/PlaceToEat';

const CampusCenterAdmin = () => {
  const [adding, setAdding] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');

  const { ready, ccvendor } = useTracker(() => {
    const subscription = Meteor.subscribe(CCVendors.userPublicationName);
    const rdy = subscription.ready();
    const ccvendorItems = CCVendors.collection.find({}).fetch();
    return {
      ccvendor: ccvendorItems,
      ready: rdy,
    };
  }, []);

  const handleAddVendor = () => {
    Meteor.call('ccvendor.add', newVendorName, (error) => {
      if (error) {
        console.error('Error adding vendor:', error.reason || error.message);
      } else {
        setNewVendorName('');
        setAdding(false);
      }
    });
  };

  const handleRemoveVendor = (vendorId) => {
    Meteor.call('ccvendor.remove', vendorId, (error) => {
      if (error) {
        console.error('Error removing vendor:', error.reason || error.message);
      }
    });
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center py-3">
        <Col>
          <Col className="text-center">
            <h2 className="fw-bold">[Add / Remove] Campus Center</h2>
          </Col>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="success" className="m-1" disabled>Campus Center [Admin]</Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/pp">Paradise Palms [Admin]</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/ft">Food Trucks [Admin]</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/hh">Hemenway Hall [Admin]</Nav.Link>
          </Button>
          <Button variant="success" className="m-1">
            <Nav.Link as={NavLink} to="/rd">Residential Dining [Admin]</Nav.Link>
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 py-4">
        {ccvendor.map((place) => (
          <Col key={place._id}>
            <div className="vendor-wrapper">
              <PlaceToEat place={place} />
              <Button variant="danger" onClick={() => handleRemoveVendor(place._id)} className="mt-2">
                Remove
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      {adding && (
        <Row className="justify-content-center py-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter vendor name"
              value={newVendorName}
              onChange={(e) => setNewVendorName(e.target.value)}
            />
            <Button variant="primary" className="mt-2" onClick={handleAddVendor}>
              Add Vendor
            </Button>
          </Col>
        </Row>
      )}
      {!adding && (
        <Row className="justify-content-center py-3">
          <Col>
            <Button variant="primary" onClick={() => setAdding(true)}>Add Vendor</Button>
          </Col>
        </Row>
      )}
    </Container>
  ) : <LoadingSpinner />);
};

export default CampusCenterAdmin;
