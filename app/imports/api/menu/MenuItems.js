import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class MenuItemsCollection {
  constructor() {
    // Define the name for the aggregated collection
    this.name = 'MenuItemsCollection';

    // Define the Mongo collection for the aggregated collection
    this.collection = new Mongo.Collection(this.name);

    // Define the schema for the aggregated collection
    this.schema = new SimpleSchema({
      vendorName: String,
      menuItems: {
        type: Array,
      },
      'menuItems.$': Object,
      'menuItems.$.itemName': String,
      'menuItems.$.price': String,
    });

    // Attach the schema to the aggregated collection
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the VendorsCollection.
 * @type {MenuItemsCollection}
 */
// Instantiate the aggregated collection
export const MenuItems = new MenuItemsCollection();
