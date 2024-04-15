import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, TextField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { CCVendors } from '../../../api/ccvendor/CCVendors';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  location: {
    type: String,
    allowedValues: ['Campus Center', 'Paradise Palms', 'Food Truck Row', 'Hemenway Hall', 'Residential Dining'],
    defaultValue: 'Campus Center',
  },
  hours: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddCCVendor = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, image, location, hours, owner } = data;
    CCVendors.collection.insert(
      { name, image, location, hours, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Campus Center Vendor</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
                  <TextField name="owner" />
                </Row>
                <SubmitField className="pb-3" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCCVendor;
