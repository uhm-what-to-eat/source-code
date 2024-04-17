import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaceToEat from '../components/PlaceToEat';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendors } from '../../api/vendor/Vendors';

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const { ready, placesToEat } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const rdy = subscription.ready();
    const places = Vendors.collection.find({}).fetch();
    return {
      placesToEat: places,
      ready: rdy,
    };
  }, []);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const [placesToRender, setPlacesToRender] = useState(() => {
    const storedPlaces = localStorage.getItem('randomPlaces');
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  });

  useEffect(() => {
    if (!placesToRender.length && ready && placesToEat.length > 0) {
      const shuffledPlaces = shuffleArray(placesToEat);
      const selectedPlaces = shuffledPlaces.slice(0, 3);
      setPlacesToRender(selectedPlaces);
      localStorage.setItem('randomPlaces', JSON.stringify(selectedPlaces));
    }
  }, [ready, placesToEat, placesToRender]);

  const renderContent = () => {
    if (currentUser) {
      return (ready ? (
        <Container className="py-3">
          <Row className="align-middle text-center py-3">
            <h1>Welcome Back {currentUser.username}!</h1>
            <h2>Top Eats For You: </h2>
          </Row>
          <Row>
            {placesToRender.map((place) => (
              <Col key={place._id}>
                <PlaceToEat place={place} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : <LoadingSpinner />);
    }
    return (
      <Container id="landing-page" fluid className="py-3">
        <Row className="align-middle text-center">
          <Col xs={4} />
          <Col xs={4}>
            <h1>UHM... What To Eat?</h1>
            <h2>Manoa&apos;s One Stop Shop For Mouthwatering Munchies!</h2>
          </Col>
        </Row>
        <Row className="align-middle text-center row p-4">
          <Col xs={4}>
            <Image src="images/landing-page-sign-in-logo.png" width="150px" />
            <h1 className="p-2">Want to see Manoa&apos;s Biggest Munches?</h1>
            <h2><Link to="/signupuser" className="link">Sign Up Now Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image src="images/landing-page-log-in.png" width="150px" />
            <h1 className="p-2">Already A Munch?</h1>
            <h2><Link to="/signin" color="dark-green" className="link">Login in Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image src="images/landing-page-vendor.png" width="150px" />
            <h1 className="p-2">Do You Want To Sell?</h1>
            <h2><Link to="/signupvendor" className="link">Become A Vendor Here!</Link></h2>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container id="landing-page" fluid className="py-3">
      {renderContent()}
    </Container>
  );
};

export default Landing;
