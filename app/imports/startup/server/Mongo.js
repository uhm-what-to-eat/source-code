import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/vendor/Vendors';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Function to add vendors to the AllVendors collection
const addVendors = (vendors) => {
  vendors.forEach((vendor) => {
    console.log(`Adding: ${vendor.name}`);
    Vendors.collection.insert(vendor);
  });
};

// Check if the AllVendors collection is empty, if so, add default vendors from all vendor types
if (Vendors.collection.find().count() === 0) {
  addVendors(Meteor.settings.defaultVendors);
}
