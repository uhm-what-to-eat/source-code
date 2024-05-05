import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, ListField, ListItemField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Vendors } from '../../api/vendor/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Vendors.schema);

/* Renders the EditStuff page for editing a single document. */
const EditVendor = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Vendors.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, image, location, hours, owner, menuImage, category, menuItems } = data;
    Vendors.collection.update(_id, { $set: { name, image, location, hours, owner, menuImage, category, menuItems } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Vendor</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="image" /></Col>
                  <Col><SelectField name="location" /></Col>
                </Row>
                <Row>
                  <LongTextField name="hours" />
                </Row>
                <Row>
                  <SelectField name="category" help="Select 1-3 categories." showInlineError multiple />
                </Row>
                <Row>
                  <TextField name="menuImage" />
                </Row>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Row>
                    <TextField name="owner" />
                  </Row>
                ) : ''}
                <h6 className="pt-3">Include Your 3 Best Selling Items!</h6>
                <ListField name="menuItems" initialCount={3}>
                  <ListItemField name="$">
                    <Row>
                      <Col><TextField id="signup-vendor-form-itemName" name="itemName" placeholder="Item Name" /></Col>
                      <Col><TextField id="signup-vendor-form-price" name="price" placeholder="Price" /></Col>
                    </Row>
                  </ListItemField>
                </ListField>
                <SubmitField className="pb-3" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditVendor;
