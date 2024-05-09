import { Selector } from 'testcafe';

class PlacesToEat {
  constructor() {
    this.pageId = '#places-to-eat-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async campusCenter(testController) {
    await testController.click('#campus-center');
  }

  async paradisePalms(testController) {
    await testController.click('#paradise-palms');
  }

  async hemenwayHall(testController) {
    await testController.click('#hemenway-hall');
  }

  async foodTrucks(testController) {
    await testController.click('#food-trucks');
  }

  async residentialDining(testController) {
    await testController.click('#residential-dining');
  }

  async clickFavorite(testController) {
    await testController.click('#favorite');
  }
}

export const placesToEat = new PlacesToEat();
