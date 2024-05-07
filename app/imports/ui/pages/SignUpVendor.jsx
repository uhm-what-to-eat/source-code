import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { addVendorsMethod } from '../../startup/both/Methods';
import { MenuItems } from '../../api/menu/MenuItems';

const SignUpVendor = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    storeName: String,
    storeImage: String,
    storeMenu: String,
    storeLocation: {
      type: String,
      allowedValues: ['Campus Center', 'Paradise Palms', 'Hemenway Hall', 'Residential Dining', 'Food Trucks'],
      defaultValue: 'Campus Center',
    },
    storeHours: String,
    storeCategories: {
      type: Array,
      minCount: 1,
      maxCount: 3,
      defaultValue: 'N/A',
    },
    'storeCategories.$':
      {
        type: String,
        allowedValues: ['Drinks', 'Smoothies', 'Tea', 'Lunch', 'Vegan', 'Asian', 'American', 'Hawaiian', 'Coffee', 'Mexican', 'Indian', 'Boba', 'Breakfast', 'Quick Bite', 'N/A'],
      },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, storeName, storeImage, storeLocation, storeMenu, storeHours, storeCategories } = doc;
    // console.log(storeHours);
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
    Meteor.call(addVendorsMethod, { storeName, image: storeImage, storeLocation, storeHours, owner: email, storeMenu, storeCategories });
    MenuItems.collection.insert({ vendorName: storeName, menuItems: [] });
  };
  if (redirectToReferer) {
    return <Navigate to="/" />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register as a Vendor!</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <TextField id="signup-vendor-form-email" name="email" placeholder="E-mail address" />
                  <TextField id="signup-vendor-form-password" name="password" placeholder="Password" type="password" />
                  <ErrorsField />
                  <Col><TextField id="signup-vendor-form-name" name="storeName" /></Col>
                  <Col><SelectField id="signup-vendor-form-location" name="storeLocation" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="signup-vendor-form-image" name="storeImage" placeholder="'N/A' for no image" /></Col>
                  <Col><TextField id="signup-vendor-form-menu" name="storeMenu" placeholder="'N/A' for no image" /></Col>
                </Row>
                <Row>
                  <SelectField id="signup-vendor-store-categories" name="storeCategories" help="Please select 1-3 categories" showInlineError multiple />
                </Row>
                <Row>
                  <LongTextField id="signup-vendor-form-hours" name="storeHours" placeholder="e.g. Mon-Fri 2-4pm" />
                </Row>
                <SubmitField id="signup-vendor-form-submit" />
                <ErrorsField />
                <h6 className="pt-3">Email UHMwhattoeat@hawaii.edu with your image file if you do not have a URL.</h6>
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUpVendor.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
    }),
  }),
};

SignUpVendor.defaultProps = {
  location: { state: {} },
};

export default SignUpVendor;
