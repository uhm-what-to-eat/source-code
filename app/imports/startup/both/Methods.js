import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Vendors } from '../../api/vendor/Vendors';

const addVendorsMethod = 'Vendors.add';

Meteor.methods({
  'Vendors.add'({ storeName, image, storeLocation, storeHours, owner, storeMenu }) {
    console.log(storeName, storeHours, image, owner, storeMenu, storeLocation);
    if (Meteor.isServer) {
      try {
        // console.log(this.userId);
        // console.log(`${Meteor.user().username} hello`);
        Roles.createRole('vendor', { unlessExists: true });
        Roles.addUsersToRoles(this.userId, 'vendor');
        // Insert the vendor data into the Vendors collection
        Vendors.collection.insert({ name: storeName, image: image, location: storeLocation, hours: storeHours, owner: owner, menuImage: storeMenu });
        // console.log(vendorId); // Optionally return the ID of the inserted document
      } catch (error) {
        throw new Meteor.Error('vendor-insertion-failed', 'Failed to insert vendor data');
      }
    }
    return null;
  },
});

export { addVendorsMethod };
