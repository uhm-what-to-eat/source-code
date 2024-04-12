import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Col, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const UserLanding = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center row p-4">
        {currentUser ? ([
          <Col>
            TEST THIS IS A TEST!!!
          </Col>,
        ]) : ''}
      </Row>
    </Container>
  );
};

export default UserLanding;
