import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Image, Container } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  useEffect(() => {
    Meteor.logout();
    localStorage.removeItem('randomPlaces'); // Clear randomPlaces from localStorage
  }, []);

  return (
    <Container fluid className="py-3">
      <Col />
      <div className="text-center">
        <Image src="https://cdn.dribbble.com/users/3951514/screenshots/7288432/media/866b49d81c982fdecd5a22de44c5e677.gif" className="signout-image" />
        <Col id="signout-page">
          <h1>Safe Travels and Happy Eating!</h1>
        </Col>
      </div>
    </Container>

  );
};

export default SignOut;
