import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Image, Row, Button, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendors';
import { MenuItems } from '../../api/menu/MenuItems';
import LoadingSpinner from '../components/LoadingSpinner';

const removeMenuItem = (menu, item) => {
  console.log(item);
  MenuItems.collection.update({ _id: menu._id }, { $pull: { menuItems: item } });
};
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Menu = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user(),
  }), []);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { vendor, menu, ready, menuReady } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const menuSubscription = Meteor.subscribe(MenuItems.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const menuRdy = menuSubscription.ready();
    // Get the document
    const document = Vendors.collection.findOne(_id);
    const menuDocument = MenuItems.collection.findOne({ vendorName: document.name });
    return {
      vendor: document,
      menu: menuDocument,
      ready: rdy,
      menuReady: menuRdy,
    };
  }, [_id, currentUser]);
  const renderContent = () => {
    if (Roles.userIsInRole(currentUser, 'vendor') || Roles.userIsInRole(currentUser, 'admin')) {
      return (ready && menuReady ? (
        <Container className="py-3">
          <Row className="justify-content-center">
            <Col>
              <Col className="text-center">
                <h1>{`${vendor.name}'s Menu!`}</h1>
              </Col>
            </Col>
            <Image src={`${vendor.menuImage}`} style={{ paddingTop: '20px', paddingBottom: '20px' }} />
          </Row>
          <Row>
            <Col>
              <h1>Vendor/Admin Recommended Items:</h1>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col>
              <Button><Nav.Link as={NavLink} to={`/addMenuItem/${menu._id}`}>Add Menu Item</Nav.Link></Button>
            </Col>
          </Row>
          <ul>
            {menu.menuItems.map((item) => (
              <li key={item._id} className="py-1">{`${item.itemName}: ${item.price}`}
                <Button variant="danger" className="mx-1 btn-sm"><Nav.Link as={NavLink} to={`/editMenuItem/${menu._id}/${item}`}>Edit</Nav.Link></Button>/
                <Button variant="danger" className="mx-1 btn-sm" onClick={() => removeMenuItem(menu, item)}>Remove</Button>
              </li>
            ))}
          </ul>
        </Container>
      ) : <LoadingSpinner />);
    }
    return (ready && menuReady ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h1>{`${vendor.name}'s Menu!`}</h1>
            </Col>
          </Col>
          <Image src={`${vendor.menuImage}`} style={{ paddingTop: '20px', paddingBottom: '20px' }} />
        </Row>
        <Row>
          <Col>
            <h1>Recommended Items:</h1>
          </Col>
        </Row>
        <ul>
          {menu.menuItems.map((item) => (
            <li>{`${item.itemName}: ${item.price}`}</li>
          ))}
        </ul>
      </Container>
    ) : <LoadingSpinner />);
  };
  return (
    <Container>
      {renderContent()}
    </Container>
  );
};

export default Menu;
