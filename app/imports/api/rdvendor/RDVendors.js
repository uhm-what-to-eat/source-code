import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The HHVendorsCollection. It encapsulates state and variable values for stuff.
 */
class RDVendorsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RDVendorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      image: String,
      location: String,
      hours: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RDVendorsCollection.
 * @type {RDVendorsCollection}
 */
export const RDVendors = new RDVendorsCollection();
