import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class VendorCategoriesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorCategoriesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      vendor: String,
      category: {
        type: Array,
        minCount: 1,
        maxCount: 3,
      },
      'category.$':
        {
          type: String,
          allowedValues: ['Drinks', 'Smoothies', 'Tea', 'Lunch', 'Vegan', 'Asian', 'American', 'Hawaiian', 'Coffee', 'Mexican', 'Indian', 'Boba', 'Breakfast', 'Quick Bite', 'N/A'],
        },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const VendorCategories = new VendorCategoriesCollection();
