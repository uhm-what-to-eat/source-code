import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#search-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async search(testController) {
    await this.isDisplayed(testController);
    // Select visualization and submit
    const interestsSelector = Selector('#category-search div.form-check input');
    console.log(await interestsSelector.count);
    await testController.click(interestsSelector.nth(1));
    await testController.click('#search-btn input.btn.btn-primary');
  }
}

export const searchPage = new SearchPage();
