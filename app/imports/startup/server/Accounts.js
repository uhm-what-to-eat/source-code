import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
// import { Vendors } from '../../api/vendor/Vendors';

/* eslint-disable no-console */

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'vendor') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'vendor');
  }
};
// function addVendor({ email, password, storeName, image, storeLocation, storeMenu, storeHours }) {
//   createUser(email, password, 'vendor');
//   Vendors.collection.insert({ storeName, image, storeLocation, storeHours, owner: email, storeMenu });
// }

// When running app for first time, pass a settings file to set up a default user account.
const existingAccounts = Meteor.users.find({ 'emails.address': { $in: Meteor.settings.defaultAccounts.map(account => account.email) } }).count();

if (existingAccounts < Meteor.settings.defaultAccounts.length) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => {
      if (!Meteor.users.findOne({ 'emails.address': email })) {
        createUser(email, password, role);
      }
    });
  } else {
    console.log('Cannot initialize the database! Please invoke Meteor with a settings file.');
  }
} else {
  console.log('Default accounts already exist in the database.');
}

export default createUser;
