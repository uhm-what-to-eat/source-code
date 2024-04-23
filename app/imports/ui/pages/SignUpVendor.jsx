import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField } from 'uniforms-bootstrap5';

const SignUp = ({ location }) => {
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
    // Note: File handling is not included in SimpleSchema, but we'll add a placeholder for UI purposes
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, storeName, storeLocation, storeHours } = doc;
    // Assuming the file upload handling and MongoDB insertion logic will be implemented here or in the Accounts.createUser callback
    Accounts.createUser({ email, username: email, password, profile: { storeName, storeLocation, storeHours, type: 'Vendor' } }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
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
                  <TextField name="email" placeholder="E-mail address" />
                  <TextField name="password" placeholder="Password" type="password" />
                  <ErrorsField />
                  <Col><TextField name="storeName" /></Col>
                  <Col><SelectField name="storeLocation" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="storeImage" /></Col>
                  <Col><TextField name="storeMenu" placeholder="'N/A' for no image" /></Col>
                </Row>
                <Row>
                  <LongTextField name="storeHours" placeholder="e.g. Mon-Fri 2-4pm" />
                </Row>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Store Image</Form.Label>
                  <Form.Control type="file" disabled /> {/* Disabled for now */}
                </Form.Group>
                <SubmitField inputClassName="green-submit" />
                <ErrorsField />
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

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }),
};

SignUp.defaultProps = {
  location: { state: {} },
};

export default SignUp;
