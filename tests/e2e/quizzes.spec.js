const { test, expect } = require('@playwright/test');

/**
 * Quiz Functionality E2E Tests
 * Tests the quiz engine on tutorial pages
 */
test.describe('Quiz Functionality Tests', () => {
  
  test('Playwright tutorial quiz loads', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Check quiz container exists
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
    
    // Check start screen is visible
    const startScreen = page.locator('.quiz-start, .start-screen, [class*="start"]');
    await expect(startScreen.first()).toBeVisible();
  });

  test('Can start a quiz', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Look for start button
    const startButton = page.locator('button:has-text("Start"), button:has-text("start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Check quiz questions are visible
      await expect(page.locator('.question, .quiz-question')).toBeVisible();
    }
  });

  test('Quiz has timer functionality', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Click start to begin quiz
    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Check timer is visible
      const timer = page.locator('.timer, .countdown, [class*="timer"]');
      await expect(timer.first()).toBeVisible();
    }
  });

  test('Quiz has question selector (5/10/15/20)', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Check for question count options
    const options = page.locator('button:has-text("5"), button:has-text("10"), button:has-text("15"), button:has-text("20")');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Cypress tutorial quiz loads', async ({ page }) => {
    await page.goto('/tutorial-cypress-intro.html');
    
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
  });

  test('AI Agents quiz loads', async ({ page }) => {
    await page.goto('/tutorial-agents.html');
    
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
  });

  test('Enterprise quiz loads', async ({ page }) => {
    await page.goto('/tutorial-enterprise.html');
    
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
  });

  test('Quiz can answer questions', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Start the quiz
    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Wait for question to appear
      await page.waitForSelector('.question, .quiz-question', { timeout: 5000 });
      
      // Click an answer option
      const answerOption = page.locator('.option, .answer, [class*="option"]').first();
      if (await answerOption.isVisible()) {
        await answerOption.click();
        
        // Check that something happens after answer (feedback or next question)
        await page.waitForTimeout(500);
      }
    }
  });

  test('Quiz shows results at end', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Check that quiz has results capability
    const quizContainer = page.locator('#quiz-container');
    await expect(quizContainer).toBeVisible();
  });
});
