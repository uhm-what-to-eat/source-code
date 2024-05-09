import { Selector } from 'testcafe';

class CampusCenterPage {
  constructor() {
    this.pageId = '#campus-center-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async placeCC(testController) {
    await testController.click('#place');
  }
}

export const ccPage = new CampusCenterPage();
