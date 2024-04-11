import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The CCVendorsCollection. It encapsulates state and variable values for stuff.
 */
class CCVendorsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CCVendorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      image: String,
      location: String,
      owner: String,
      hours: {
        type: Object,
        label: 'Opening hours for each day of the week',
      },
      'hours.monday': {
        type: String,
        label: 'Monday',
        optional: true, // Optional depending on your requirements
      },
      'hours.tuesday': {
        type: String,
        label: 'Tuesday',
        optional: true,
      },
      'hours.wednesday': {
        type: String,
        label: 'Wednesday',
        optional: true,
      },
      'hours.thursday': {
        type: String,
        label: 'Thursday',
        optional: true,
      },
      'hours.friday': {
        type: String,
        label: 'Friday',
        optional: true,
      },
      'hours.saturday': {
        type: String,
        label: 'Saturday',
        optional: true,
      },
      'hours.sunday': {
        type: String,
        label: 'Sunday',
        optional: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the CCVendorsCollection.
 * @type {CCVendorsCollection}
 */
export const CCVendors = new CCVendorsCollection();
