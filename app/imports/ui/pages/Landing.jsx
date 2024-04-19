import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import PlaceToEat from '../components/PlaceToEat';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendors } from '../../api/vendor/Vendors';
import PlaceToEatEdit from '../components/PlaceToEatEdit';

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const { ready, placesToEat, vendor } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const rdy = subscription.ready();
    const places = Vendors.collection.find({}).fetch();
    const vendorItems = Vendors.collection.find({}).fetch();
    return {
      placesToEat: places,
      vendor: vendorItems,
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
      if (Roles.userIsInRole(currentUser, 'vendor')) {
        return (ready ? (
          <Container className="py-3">
            <Row className="align-middle text-center py-3">
              <h1>Welcome Back {currentUser.username}!</h1>
              <h2>VENDORSSSS </h2>
            </Row>
            <Row className="justify-content-center py-3">
              <Col>
                <Col className="text-center">
                  <h2 className="fw-bold">Your Vendors</h2>
                </Col>
              </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4 py-4">
              if(currentUser.email === vendor.owner){
              {vendor.map((place) => (<Col key={place._id}><PlaceToEatEdit place={place} /></Col>))}
            }
            </Row>
          </Container>
        ) : <LoadingSpinner />);
      }
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
            <Image src="images/landing-page-log-in-removedbg.png" width="120px" />
            <h1 className="p-2">Already A Munch?</h1>
            <h2><Link to="/signin" color="dark-green" className="link">Login in Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image src="images/Eat-Play-Stay-Hawaii-Logo-removebg.png" width="160px" />
            <h1 className="p-2">Want to see Manoa&apos;s Biggest Munches?</h1>
            <h2><Link to="/signupuser" className="link">Sign Up Now Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image src="images/pixelcut-export.png" width="120px" />
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
