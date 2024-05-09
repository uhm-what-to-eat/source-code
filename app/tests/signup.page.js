import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }

  async signupVendor(testController, username, password, name, location, image, categories, menu, hours) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-vendor-form-email', username);
    await testController.typeText('#signup-vendor-form-password', password);
    await testController.typeText('#signup-vendor-form-name', name);
    await testController
      .click('#signup-vendor-form-location') // Click to open the dropdown
      .click(Selector('option').withText(location));
    await testController.typeText('#signup-vendor-form-image', image);
    await testController.typeText('#signup-vendor-form-menu', menu);
    // Select each category from the array
    // eslint-disable-next-line no-restricted-syntax
    for (const category of categories) {
      // eslint-disable-next-line no-await-in-loop
      await testController
        .click('#signup-vendor-store-categories') // Click to open the dropdown
        .click(Selector('option').withText(category));
    }

    await testController.typeText('#signup-vendor-form-hours', hours);
    await testController.click('#signup-vendor-form-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
