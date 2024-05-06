import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Card, Image, Badge, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
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

// function getVendorData(email) {
//   const data = Vendors.collection.findOne({ email });
//   const category = _.pluck(VendorCategories.collection.find({ vendor: email }).fetch(), 'category');
//   const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
//   const projectPictures = projects.map(project => Projects.collection.findOne({ name: project }).picture);
//   return _.extend({}, data, { interests, projects: projectPictures });
// }

/* Component for layout out a Profile Card. */
// const MakeCard = ({ profile }) => (
//   <Col>
//     <Card className="h-100">
//       <Card.Header><Image src={profile.picture} width={50} /></Card.Header>
//       <Card.Body>
//         <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
//         <Card.Subtitle><span className="date">{profile.title}</span></Card.Subtitle>
//         <Card.Text>{profile.bio}</Card.Text>
//       </Card.Body>
//       <Card.Body>
//         {profile.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
//       </Card.Body>
//       <Card.Footer>
//         <h5>Projects</h5>
//         {profile.projects.map((project, index) => <Image key={index} src={project} width={50} />)}
//       </Card.Footer>
//     </Card>
//   </Col>
// );

// /* Properties */
// MakeCard.propTypes = {
//   profile: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     picture: PropTypes.string,
//     title: PropTypes.string,
//     bio: PropTypes.string,
//     interests: PropTypes.arrayOf(PropTypes.string),
//     projects: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// };

/* Renders the Profile Collection as a set of Cards. */
const Search = () => {
  const [category, setCategory] = useStickyState('category', []);

  const { ready, categories, vendors } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(VendorCategories.userPublicationName);
    return {
      ready: sub.ready(),
      categories: VendorCategories.collection.find().fetch(),
      vendors: VendorCategories.collection.find().fetch(),
    };
  });

  const submit = (data) => {
    setCategory(data.category || []);
  };

  const allCategories = _.pluck(categories, 'category');
  console.log(allCategories);
  const formSchema = makeSchema(allCategories);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const vendorWithCategory = vendors.filter(vend => category.includes(vend.category));
  console.log(vendorWithCategory);
  const vendorName = _.pluck(vendorWithCategory, 'profile');
  const profileData = _.uniq(vendorName).map(vendor => PlaceToEat(vendor));

  return ready ? (
    <Container id={PageIDs.filterPage} style={pageStyle}>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ category }}>
        <Card>
          <Card.Body id={ComponentIDs.filterFormInterests}>
            <SelectField name="category" multiple placeholder="Categories" checkboxes />
            <SubmitField id={ComponentIDs.filterFormSubmit} value="Submit" />
          </Card.Body>
        </Card>
      </AutoForm>
      <Row xs={1} md={2} lg={4} className="g-2" style={{ paddingTop: '10px' }}>
        {/* Render your vendor categories here */}
        {profileData.map((place) => (
          <Col key={place._id}><PlaceToEat place={place} /></Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Search;
