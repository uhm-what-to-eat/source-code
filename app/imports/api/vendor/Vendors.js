import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class VendorsCollection {
  constructor() {
    // Define the name for the aggregated collection
    this.name = 'VendorsCollection';

    // Define the Mongo collection for the aggregated collection
    this.collection = new Mongo.Collection(this.name);

    // Define the schema for the aggregated collection
    this.schema = new SimpleSchema({
      // Define the fields from individual collections
      // Adjust the schema as per your requirements
      // Merge schemas of all collections
      name: String,
      image: String,
      location: {
        type: String,
        allowedValues: ['Campus Center', 'Paradise Palms', 'Food Truck Row', 'Hemenway Hall', 'Residential Dining'],
      },
      hours: String,
      owner: String,
      menuImage: String,
      // Add fields from VendorsCollection
      // Ensure there are no field name conflicts
      // Adjust field names if necessary
      // Here I'm assuming that there won't be conflicts and all fields are the same
      category: {
        type: Array,
        optional: false,
        minCount: 1,
        maxCount: 3,
      },
      'category.$':
        {
          type: String,
          allowedValues: ['Drinks', 'Smoothies', 'Tea', 'Lunch', 'Vegan', 'Asian', 'American', 'Hawaiian', 'Coffee', 'Mexican', 'Indian', 'Boba', 'Breakfast', 'Quick Bite'],
        },
    });

    // Attach the schema to the aggregated collection
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}
/**
 * The singleton instance of the RDVendorsCollection.
 * @type {VendorsCollection}
 */
// Instantiate the aggregated collection
export const Vendors = new VendorsCollection();
