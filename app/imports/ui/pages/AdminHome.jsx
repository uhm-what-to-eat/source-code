import React from 'react';
import { Col, Container, Image, Row, Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendors/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorAdmin from '../components/VendorAdmin';

/** Admin Home */
const AdminHome = () => {
  const { ready, vendors } = useTracker(() => {
    // Get access to vendor and menu item documents.
    const subscription = Meteor.subscribe(Vendors.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the vendor documents
    const vendorItems = Vendors.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      ready: rdy,
    };
  }, []);

  const { users } = useTracker(() => ({
    users: Meteor.users.find({ profile: { status: 'pending' } }).fetch(),
  }), []);

  if (vendors.length === 0) {
    return (ready ? (
      <Container>
        <div>No vendors found, please add vendor.</div>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if all collections are available
  return (ready ? (
    <Container id="adminhome-page" fluid>
      <div className="ckH">Admin</div>
      <Image
        fluid
        src="../../images/food-court.png"
      />
      <Row className="colorBlockGreen">
        <Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor) => (<Col key={vendor._id}><VendorAdmin vendor={vendor} /></Col>))}
          </Row>
        </Col>
        <Col className="vendorBlock py-2">
          <h2>Vendor Approval</h2>
          <Container className="vendorBlock py-2">
            { users.map(user => (
              <Form className="vendorBlock mb-2 mt-2">
                <Form.Group className="mb-3" controlId="formApproveDeny">
                  <Row>
                    <Col className="col-7 mt-3 ms-4">
                      <Form.Label key={user._id}>{user.username}</Form.Label>
                    </Col>
                    <Col className="col-2 mt-2">
                      <Button // this will change status from 'pending' to 'approved'
                        variant="success"
                        type="submit"
                        onClick={() => {
                          Meteor.users.update(user._id, {
                            $set: {
                              profile: {
                                status: 'approved',
                              },
                            },
                          });
                        }}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col className="col-2 mt-2">
                      <Button // this will change status from 'pending' to 'none'
                        variant="danger"
                        type="submit"
                        onClick={() => {
                          Meteor.users.update(user._id, {
                            $set: {
                              profile: {
                                status: 'none',
                              },
                            },
                          });
                        }}
                      >
                        Deny
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminHome;
