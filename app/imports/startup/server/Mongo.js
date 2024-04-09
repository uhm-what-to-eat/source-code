import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { CCVendors } from '../../api/ccvendor/CCVendors';
import { FTVendors } from '../../api/ftvendor/FTVendors';
import { HHVendors } from '../../api/hhvendor/HHVendors';
import { PPVendors } from '../../api/ppvendor/PPVendors';
import { RDVendors } from '../../api/rdvendor/RDVendors';

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

const addCCVendors = (ccvendor) => {
  console.log(` Adding: ${ccvendor.name}`);
  CCVendors.collection.insert(ccvendor);
};

if (CCVendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultCCVendors) {
    console.log('Creating default CCVendors');
    Meteor.settings.defaultCCVendors.forEach(ccvendor => addCCVendors(ccvendor));
  }
}

const addFTVendors = (ftvendor) => {
  console.log(` Adding: ${ftvendor.name}`);
  FTVendors.collection.insert(ftvendor);
};

if (FTVendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultFTVendors) {
    console.log('Creating default FTVendors');
    Meteor.settings.defaultFTVendors.forEach(ftvendor => addFTVendors(ftvendor));
  }
}

const addHHVendors = (hhvendor) => {
  console.log(` Adding: ${hhvendor.name}`);
  HHVendors.collection.insert(hhvendor);
};

if (HHVendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultHHVendors) {
    console.log('Creating default HHVendors');
    Meteor.settings.defaultHHVendors.forEach(hhvendor => addHHVendors(hhvendor));
  }
}

const addPPVendors = (ppvendor) => {
  console.log(` Adding: ${ppvendor.name}`);
  PPVendors.collection.insert(ppvendor);
};

if (PPVendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultPPVendors) {
    console.log('Creating default PPVendors');
    Meteor.settings.defaultPPVendors.forEach(ppvendor => addPPVendors(ppvendor));
  }
}

const addRDVendors = (rdvendor) => {
  console.log(` Adding: ${rdvendor.name}`);
  RDVendors.collection.insert(rdvendor);
};

if (RDVendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultRDVendors) {
    console.log('Creating default RDVendors');
    Meteor.settings.defaultRDVendors.forEach(rdvendor => addRDVendors(rdvendor));
  }
}
