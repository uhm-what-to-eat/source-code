import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { MenuItems } from '../../api/menu/MenuItems';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  itemName: String,
  price: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddMenuItem = () => {
  const { _id } = useParams();

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { itemName, price } = data;
    const newItem = { itemName, price };
    MenuItems.collection.update(
      _id,
      { $push: { menuItems: newItem } },
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
          <Col className="text-center"><h2>Add Menu Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="itemName" /></Col>
                  <Col><TextField name="price" /></Col>
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

export default AddMenuItem;
