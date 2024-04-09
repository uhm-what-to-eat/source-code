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
      hours: String,
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