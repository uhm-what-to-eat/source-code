import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click StuffItems to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoSignUpVendorPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up-vendor');
  }

  async gotoPlacesToEatPage(testController) {
    await testController.click('#navbar-places-to-eat');
  }

  async gotoHome(testController) {
    await testController.click('#navbar-home');
  }

  async gotoYourVendors(testController) {
    await testController.click('#navbar-your-vendor');
  }

  async gotoSearchPage(testController) {
    const visible = await Selector('#navbar-search').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-search');
  }

  async gotoFavorites(testController) {
    const visible = await Selector('#navbar-favorites').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-favorites');
  }

  async gotoAddVendor(testController) {
    const visible = await Selector('#navbar-add-vendor').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-add-vendor');
  }

  async gotoEditVendor(testController) {
    const visible = await Selector('#navbar-edit-vendor').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-edit-vendor');
  }

}

export const navBar = new NavBar();
