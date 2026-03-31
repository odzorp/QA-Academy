const { test, expect } = require('@playwright/test');

/**
 * AI Agents Page E2E Tests
 * Tests for the AI Agents tutorial page
 */
test.describe('AI Agents Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/tutorial-agents.html');
  });

  test('AI Agents tutorial page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/AI Agents|Agents/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Quiz container is visible', async ({ page }) => {
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
  });

  test('Content sections are present', async ({ page }) => {
    // Check for main content
    const content = page.locator('main, .content, article, .tutorial-content');
    await expect(content.first()).toBeVisible();
  });

  test('Navigation works on page', async ({ page }) => {
    const navLinks = page.locator('nav a, .nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Footer is present', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

/**
 * Enterprise Testing Page E2E Tests
 */
test.describe('Enterprise Testing Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/tutorial-enterprise.html');
  });

  test('Enterprise tutorial page loads', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#quiz-container')).toBeVisible();
  });
});

/**
 * Correlation Testing Page E2E Tests
 */
test.describe('Correlation Testing Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/tutorial-correlation.html');
  });

  test('Correlation tutorial page loads', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });
});
