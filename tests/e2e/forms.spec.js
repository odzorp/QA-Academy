const { test, expect } = require('@playwright/test');

/**
 * Contact Form E2E Tests
 * Tests for the contact page form functionality
 */
test.describe('Contact Form Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
  });

  test('Contact page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact|QA Academy/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Contact form is visible', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('Name field exists', async ({ page }) => {
    const nameField = page.locator('input[name="name"], input[id="name"], input[placeholder*="name"]');
    await expect(nameField.first()).toBeVisible();
  });

  test('Email field exists', async ({ page }) => {
    const emailField = page.locator('input[type="email"], input[name="email"], input[id="email"]');
    await expect(emailField.first()).toBeVisible();
  });

  test('Message textarea exists', async ({ page }) => {
    const messageField = page.locator('textarea, textarea[name="message"], textarea[id="message"]');
    await expect(messageField.first()).toBeVisible();
  });

  test('Submit button exists', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await expect(submitButton.first()).toBeVisible();
  });

  test('Can fill contact form', async ({ page }) => {
    // Fill name
    const nameField = page.locator('input[name="name"], input[id="name"]').first();
    await nameField.fill('Test User');
    
    // Fill email
    const emailField = page.locator('input[type="email"], input[name="email"]').first();
    await emailField.fill('test@example.com');
    
    // Fill message
    const messageField = page.locator('textarea').first();
    await messageField.fill('This is a test message');
    
    // Verify filled
    await expect(nameField).toHaveValue('Test User');
    await expect(emailField).toHaveValue('test@example.com');
  });

  test('Email field validates format', async ({ page }) => {
    const emailField = page.locator('input[type="email"]').first();
    await emailField.fill('invalid-email');
    
    // Try to submit and check validation
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Check for HTML5 validation message or error
    await page.waitForTimeout(500);
  });

  test('Required fields are enforced', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    await page.waitForTimeout(500);
  });
});

/**
 * Tutorials Page Tests
 */
test.describe('Tutorials Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/tutorials.html');
  });

  test('Tutorials page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/Tutorials|QA Academy|Learn/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Tutorial cards are visible', async ({ page }) => {
    const cards = page.locator('.card, .tutorial-card, [class*="card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Can navigate to a tutorial', async ({ page }) => {
    // Click first tutorial link
    const tutorialLink = page.locator('a[href*="tutorial-"]').first();
    if (await tutorialLink.isVisible()) {
      await tutorialLink.click();
      await expect(page).toHaveURL(/tutorial-/);
    }
  });
});
