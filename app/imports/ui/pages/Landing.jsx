import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import PlaceToEat from '../components/PlaceToEat';
import PlaceToEatEdit from '../components/PlaceToEatEdit';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendors } from '../../api/vendor/Vendors';
import { randomizeVendors } from '../../startup/both/Methods';

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);

  const { ready, vendor } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const rdy = subscription.ready();

    const vendorItems = Vendors.collection.find({}).fetch();

    return {
      vendor: vendorItems,
      ready: rdy,
      cleanup: () => subscription.stop(), // Cleanup function to stop the subscription
    };
  }, [currentUser]);

  const [randomVendors, setRandomVendors] = useState([]);

  useEffect(() => {
    // Initialize random vendors only once when the component mounts
    if (vendor.length > 0 && randomVendors.length === 0) {
      const subscription = Meteor.subscribe(Vendors.userPublicationName);
      Meteor.call(randomizeVendors, { vendors: vendor, amount: 3 }, (error, randomized) => {
        if (!error) {
          setRandomVendors(randomized);
        } else {
          console.error('Error randomizing vendors:', error);
        }
        return () => subscription.stop();
      });
    }
  }, [vendor, randomVendors]);

  useEffect(() => {
    let usersSubscription;
    if (currentUser && Roles.userIsInRole(currentUser, 'admin')) {
      usersSubscription = Meteor.subscribe('allUsernames');
    }
    return () => {
      if (usersSubscription) {
        usersSubscription.stop();
      }
    };
  }, [currentUser]);

  const usersData = useTracker(() => {
    if (currentUser && Roles.userIsInRole(currentUser, 'admin')) {
      return Meteor.users.find().fetch();
    }
    return [];
  }, [currentUser]);

  const renderContent = () => {
    if (currentUser) {
      if (Roles.userIsInRole(currentUser, 'vendor')) {
        return (ready ? (
          <Container className="py-3">
            <Row className="align-middle text-center py-3">
              <h1>Welcome Back {currentUser.username}!</h1>
            </Row>
            <Row className="justify-content-center py-3">
              <Col>
                <Col className="text-center">
                  <h2 className="fw-bold">Your Vendors:</h2>
                </Col>
              </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4 py-4">
              {vendor.filter((place) => place.owner === currentUser.username).map((place) => (<Col key={place._id}><PlaceToEatEdit place={place} /></Col>))}
            </Row>
          </Container>
        ) : <LoadingSpinner />);
      }
      return (ready ? (
        <Container className="py-3">
          <Row className="align-middle text-center py-3">
            <h1>Welcome Back {currentUser.username}!</h1>
            <h2>Top Eats For You:</h2>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4 py-4">
            {randomVendors.map((place) => (
              <Col key={place._id}>
                <PlaceToEat place={place} />
              </Col>
            ))}
          </Row>
          {Roles.userIsInRole(currentUser, 'admin') && (
            <Row>
              <h2>Users:</h2>
              {usersData.map(user => (
                <Col key={user._id} xs={6} md={4} lg={3} className="mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{user.username}</h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      ) : <LoadingSpinner />);

    }
    return (
      <Container id="landing-page" fluid className="py-3">
        <Row className="align-middle text-center">
          <Col xs={4} />
          <Col xs={4}>
            <h1 id="name">UHM... What To Eat?</h1>
            <h2>Manoa&apos;s One Stop Shop For Mouthwatering Munchies!</h2>
          </Col>
        </Row>
        <Row className="align-middle text-center row p-4">
          <Col xs={4}>
            <Image id="flipping-image" src="images/landing-page-log-in-removedbg.png" width="120px" />
            <h1 className="p-2">Already A Munch?</h1>
            <h2><Link to="/signin" color="dark-green" className="link">Login in Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image id="flipping-image-2" src="images/Eat-Play-Stay-Hawaii-Logo-removebg.png" width="160px" />
            <h1 className="p-2">Want to see Manoa&apos;s Biggest Munches?</h1>
            <h2><Link to="/signupuser" className="link">Sign Up Now Here!</Link></h2>
          </Col>
          <Col xs={4}>
            <Image id="flipping-image" src="images/pixelcut-export.png" width="120px" />
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
