import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    storeName: String,
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
        <Col xs={12} md={6}>
          <Col className="text-center mb-4">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <TextField name="storeName" placeholder="Store Name" />
                <SelectField name="storeLocation" />
                <TextField name="storeHours" placeholder="Store Hours (e.g., Mon-Fri 9am-5pm\n Sat-Sun 9am-4pm)" />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Store Image</Form.Label>
                  <Form.Control type="file" disabled /> {/* Disabled for now */}
                </Form.Group>
                <ErrorsField />
                <SubmitField inputClassName="green-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login{' '}
            <Link to="/signin">here</Link>.
          </Alert>
          {error && (
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
