import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  useEffect(() => {
    Meteor.logout();
    localStorage.removeItem('randomPlaces'); // Clear randomPlaces from localStorage
  }, []);

  return (
    <Col id="signout-page" className="text-center py-3">
      <h2>You are signed out.</h2>
    </Col>
  );
};

export default SignOut;
