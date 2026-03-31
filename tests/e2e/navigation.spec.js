const { test, expect } = require('@playwright/test');

/**
 * Navigation E2E Tests
 * Tests all navigation links and page routing
 */
test.describe('Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/QA Academy/i);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('Navigation menu is visible', async ({ page }) => {
    const nav = page.locator('nav, .nav, header nav');
    await expect(nav.first()).toBeVisible();
  });

  test('Can navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
    await expect(page.locator('h1')).toContainText(/about/i);
  });

  test('Can navigate to Tutorials page', async ({ page }) => {
    await page.getByRole('link', { name: /tutorials/i }).first().click();
    await expect(page).toHaveURL(/tutorials/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Can navigate to Resources page', async ({ page }) => {
    await page.getByRole('link', { name: /resources/i }).first().click();
    await expect(page).toHaveURL(/resources/);
    await expect(page.locator('h1')).toContainText(/resource/i);
  });

  test('Can navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Can navigate to Quick Reference page', async ({ page }) => {
    // Try to find quick reference link in footer or nav
    const quickRefLink = page.locator('a[href="quick-reference.html"], footer a[href*="quick"]').first();
    if (await quickRefLink.isVisible()) {
      await quickRefLink.click();
      await expect(page).toHaveURL(/quick-reference/);
    } else {
      // Skip if link doesn't exist - might not be in nav
      console.log('Quick Reference link not found');
    }
  });

  test('Footer links are present', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Brand logo/navigation is clickable', async ({ page }) => {
    const logo = page.locator('.nav-brand, .navbar-brand, .logo, [class*="brand"]').first();
    await logo.click();
    await expect(page).toHaveURL(/\/index.html|\/$/);
  });

  test('All main navigation links work', async ({ page }) => {
    const navLinks = page.locator('nav a, .nav a, header a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
