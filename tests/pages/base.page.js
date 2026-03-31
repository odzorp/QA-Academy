/**
 * Base Page Object Model - Base class for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async clickLink(selector) {
    await this.page.getByRole('link', { name: selector }).click();
  }

  async clickButton(selector) {
    await this.page.getByRole('button', { name: selector }).click();
  }

  async getByText(text) {
    return this.page.getByText(text);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }
}

module.exports = { BasePage };
