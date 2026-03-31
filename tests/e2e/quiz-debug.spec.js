const { test, expect } = require('@playwright/test');

/**
 * Debug test to see what's happening with quiz interactions
 */
test.describe('Quiz Debug Tests', () => {

  test('Debug: Check quiz option structure before clicking', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Start quiz
    await page.click('#startQuizBtn');
    
    // Wait for question
    await expect(page.locator('.quiz-question')).toBeVisible({ timeout: 5000 });
    
    // Get all options before clicking
    const options = await page.locator('.quiz-option').all();
    console.log('Number of options:', options.length);
    
    // Check each option's HTML
    for (let i = 0; i < options.length; i++) {
      const html = await options[i].innerHTML();
      console.log(`Option ${i}:`, html.substring(0, 100));
    }
    
    // Check if options have click handler - click first one
    const firstOption = options[0];
    await firstOption.click();
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Check for any feedback elements after clicking
    const optionHtml = await firstOption.innerHTML();
    const pageHtml = await page.content();
    
    console.log('After click, first option class:', await firstOption.getAttribute('class'));
    console.log('Page has "correct" class:', pageHtml.includes('correct'));
    console.log('Page has "incorrect" class:', pageHtml.includes('incorrect'));
    console.log('Page has "quiz-explanation":', pageHtml.includes('quiz-explanation'));
    
    // Check for explanation element
    const explanation = page.locator('#quizExplanation');
    const expHtml = await explanation.innerHTML();
    console.log('Explanation HTML:', expHtml.substring(0, 200));
  });

  test('Debug: Check browser console for errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/tutorial-playwright-intro.html');
    
    // Start quiz
    await page.click('#startQuizBtn');
    
    // Wait for question
    await expect(page.locator('.quiz-question')).toBeVisible({ timeout: 5000 });
    
    // Click an option
    await page.locator('.quiz-option').first().click();
    
    // Wait
    await page.waitForTimeout(2000);
    
    console.log('Console errors:', errors);
    expect(errors).toHaveLength(0);
  });

  test('Debug: Click option and check DOM changes', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Start quiz
    await page.click('#startQuizBtn');
    
    // Wait for question
    await expect(page.locator('.quiz-question')).toBeVisible({ timeout: 5000 });
    
    // Get first option's initial state
    const option = page.locator('.quiz-option').first();
    const initialClasses = await option.getAttribute('class');
    console.log('Initial classes:', initialClasses);
    
    // Click the option
    await option.click();
    
    // Wait for any DOM changes
    await page.waitForTimeout(1500);
    
    // Get classes after click
    const afterClasses = await option.getAttribute('class');
    console.log('After click classes:', afterClasses);
    
    // Also check all options after click
    const allOptions = await page.locator('.quiz-option').all();
    for (let i = 0; i < allOptions.length; i++) {
      const classes = await allOptions[i].getAttribute('class');
      console.log(`Option ${i} classes after click:`, classes);
    }
  });

  test('Debug: Complete a full quiz and check results', async ({ page }) => {
    await page.goto('/tutorial-playwright-intro.html');
    
    // Start with 2 questions for quick test
    // First select 5, then answer quickly
    
    // Click start
    await page.click('#startQuizBtn');
    
    // Answer 5 questions
    for (let i = 0; i < 5; i++) {
      console.log(`Answering question ${i + 1}`);
      
      // Wait for question
      await expect(page.locator('.quiz-question')).toBeVisible({ timeout: 10000 });
      
      // Click any option
      await page.locator('.quiz-option').first().click();
      
      // Wait for next button
      await page.waitForTimeout(1000);
      
      // Click next
      const nextBtn = page.locator('#quizNext');
      if (await nextBtn.isVisible().catch(() => false)) {
        await nextBtn.click();
      }
    }
    
    // Wait for results
    await page.waitForTimeout(3000);
    
    // Check what's on page
    const content = await page.content();
    console.log('Has results:', content.includes('results') || content.includes('score') || content.includes('Quiz Complete'));
    console.log('Has correct class:', content.includes('correct'));
    
    // Look for results element
    const results = page.locator('.quiz-results, .results, #results, [class*="result"]');
    const count = await results.count();
    console.log('Results elements found:', count);
  });
});
