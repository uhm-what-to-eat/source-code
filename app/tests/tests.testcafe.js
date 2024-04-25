import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { placesToEat } from './placestoeat.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

const credentialsVendor = { username: 'subway@foo.com', password: 'changeme' };

const signUp = { username: 'joshua@foo.com', password: 'changeme' };

const signUpVendor = { username: 'testvendor@foo.com', password: 'changeme', name: 'test shop', location: 'Paradise Palms', image: 'N/A', menu: 'N/A test', hours: 'Mon-Fri 12-8pm' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
//
// test('Test that signup user and signout work', async (testController) => {
//   await navBar.gotoSignUpPage(testController);
//   await signupPage.signupUser(testController, signUp.username, signUp.password);
//   await navBar.isLoggedIn(testController, signUp.username);
//   await navBar.logout(testController);
//   await signoutPage.isDisplayed(testController);
// });

test('Test that signup vendor and signout work', async (testController) => {
  await navBar.gotoSignUpVendorPage(testController);
  await signupPage.signupVendor(testController, signUpVendor.username, signUpVendor.password, signUpVendor.name, signUpVendor.location, signUpVendor.image, signUpVendor.menu, signUpVendor.hours);
  await navBar.isLoggedIn(testController, signUpVendor.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Places to Eat page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
});

test('Test the Places to Eat, Campus Center page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
  await placesToEat.campusCenter(testController);
});

test('Test the Places to Eat, Paradise Palms page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
  await placesToEat.paradisePalms(testController);
});

test('Test the Places to Eat, Food Trucks page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
  await placesToEat.foodTrucks(testController);
});

test('Test the Places to Eat, Hemenway Hall page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
  await placesToEat.hemenwayHall(testController);
});

test('Test the Places to Eat, Residential Dining page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoPlacesToEatPage(testController);
  await placesToEat.isDisplayed(testController);
  await placesToEat.residentialDining(testController);
});

test('Test that signin Vendor, Your Vendors page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signinVendor(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.isLoggedIn(testController, credentialsVendor.username);
  await navBar.gotoYourVendors(testController);
});
