const { test, expect, devices } = require('@playwright/test');

/**
 * Responsive Design E2E Tests
 * Tests for mobile and tablet views
 */

/**
 * Desktop Tests (default viewport)
 */
test.describe('Desktop View', () => {
  test('Home page displays correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Navigation should be visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Hero/content should be visible
    await expect(page.locator('main, .hero, .content').first()).toBeVisible();
  });
});

/**
 * Tablet Tests
 */
test.describe('Tablet View', () => {
  test('Home page displays correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main, .hero, .content').first()).toBeVisible();
  });

  test('Navigation works on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Click on a nav link
    const navLink = page.locator('nav a').first();
    await navLink.click();
    await page.waitForTimeout(500);
  });
});

/**
 * Mobile Tests
 */
test.describe('Mobile View', () => {
  test('Home page displays correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Content should still be visible
    await expect(page.locator('main, .hero, .content').first()).toBeVisible();
  });

  test('Navigation is accessible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigation should be present
    const nav = page.locator('nav, .nav, header');
    await expect(nav.first()).toBeVisible();
  });

  test('Quiz is usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/tutorial-playwright-intro.html');
    
    // Quiz container should be visible
    await expect(page.locator('#quiz-container')).toBeVisible();
    
    // Start button should be accessible
    const startButton = page.locator('button').first();
    await expect(startButton).toBeVisible();
  });

  test('Contact form is usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact.html');
    
    // Form should be visible
    await expect(page.locator('form')).toBeVisible();
    
    // Inputs should be accessible
    const inputs = page.locator('input, textarea');
    await expect(inputs.first()).toBeVisible();
  });
});

/**
 * Viewport Size Tests
 */
test.describe('Various Viewport Sizes', () => {
  const viewports = [
    { width: 320, height: 568 }, // iPhone SE
    { width: 375, height: 667 }, // iPhone 12
    { width: 414, height: 896 }, // iPhone 11
    { width: 768, height: 1024 }, // iPad
    { width: 1024, height: 768 }, // iPad Landscape
    { width: 1280, height: 800 }, // Laptop
    { width: 1920, height: 1080 }, // Desktop
  ];

  for (const viewport of viewports) {
    test(`Page renders at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Page should load without crashing
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
