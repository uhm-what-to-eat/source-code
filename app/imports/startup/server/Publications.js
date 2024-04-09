import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { CCVendors } from '../../api/ccvendor/CCVendors';
import { FTVendors } from '../../api/ftvendor/FTVendors';
import { HHVendors } from '../../api/hhvendor/HHVendors';
import { PPVendors } from '../../api/ppvendor/PPVendors';
import { RDVendors } from '../../api/rdvendor/RDVendors';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(CCVendors.userPublicationName, function () {
  return CCVendors.collection.find();
});

Meteor.publish(FTVendors.userPublicationName, function () {
  return FTVendors.collection.find();
});

Meteor.publish(HHVendors.userPublicationName, function () {
  return HHVendors.collection.find();
});

Meteor.publish(PPVendors.userPublicationName, function () {
  return PPVendors.collection.find();
});

Meteor.publish(RDVendors.userPublicationName, function () {
  return RDVendors.collection.find();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
