import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class AllVendorsCollection {
  constructor() {
    // Define the name for the aggregated collection
    this.name = 'AllVendorsCollection';

    // Define the Mongo collection for the aggregated collection
    this.collection = new Mongo.Collection(this.name);

    // Define the schema for the aggregated collection
    this.schema = new SimpleSchema({
      // Define the fields from individual collections
      // Adjust the schema as per your requirements
      // Merge schemas of all collections
      name: String,
      image: String,
      location: String,
      hours: String,
      owner: String,
      // Add fields from RDVendorsCollection
      // Ensure there are no field name conflicts
      // Adjust field names if necessary
      // Here I'm assuming that there won't be conflicts and all fields are the same
    });

    // Attach the schema to the aggregated collection
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}
/**
 * The singleton instance of the RDVendorsCollection.
 * @type {AllVendorsCollection}
 */
// Instantiate the aggregated collection
export const AllVendors = new AllVendorsCollection();
