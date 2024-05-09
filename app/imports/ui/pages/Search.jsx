import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorCategories } from '../../api/vendor/VendorCategories';
import PlaceToEat from '../components/PlaceToEat';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allCategories) => new SimpleSchema({
  category: { type: Array, label: 'Categories', optional: true },
  'category.$': { type: String, allowedValues: allCategories },
});

/* Renders the Profile Collection as a set of Cards. */
const Search = () => {
  const [category, setCategory] = useStickyState('category', []);

  const { ready, categories, vendors } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(VendorCategories.userPublicationName);
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    return {
      ready: sub.ready() && subscription.ready(),
      categories: VendorCategories.collection.find({}).fetch(),
      vendors: Vendors.collection.find({}).fetch(),
    };
  });

  const submit = (data) => {
    setCategory(data.category || []);
  };

  const uniqueCategories = _.uniq(_.flatten(_.pluck(categories, 'category')));
  console.log(uniqueCategories);
  const formSchema = makeSchema(uniqueCategories);
  const bridge = new SimpleSchema2Bridge(formSchema);
  console.log(category);
  console.log(vendors);
  console.log(categories);
  const vendorWithCategory = vendors.filter(vend => {
    // Initialize a variable to keep track of whether all categories are included
    let allCategoriesIncluded = true;

    // Iterate through each category
    category.forEach((cat) => {
      // If any category is not found in vendor's categories, set the flag to false
      if (!vend.category?.includes(cat)) {
        allCategoriesIncluded = false;
      }
    });
    // Return true only if all categories are included
    return allCategoriesIncluded;
  });

  console.log(vendorWithCategory);
  const vendorData = vendorWithCategory;

  return ready ? (
    <Container id="search-page" style={pageStyle}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ category }}>
        <Card>
          <Card.Body id={ComponentIDs.filterFormInterests}>
            <SelectField id="category-search" name="category" multiple placeholder="Categories" checkboxes />
            <SubmitField id="search-btn" value="Submit" />
          </Card.Body>
        </Card>
      </AutoForm>
      <Row xs={1} md={2} lg={4} className="g-2" style={{ paddingTop: '10px' }}>
        {/* Render your vendor categories here */}
        {vendorData?.map((vendor) => (
          <Col key={vendor._id}><PlaceToEat place={vendor} /></Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Search;
