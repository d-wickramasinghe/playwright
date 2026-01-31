const { test } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

test('Pos_UI_0001 | Application loads successfully', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const input = page.getByRole('textbox', { name: /input your singlish text here/i });
  const isVisible = await input.isVisible();
  console.log(`TC ID: Pos_UI_0001\nInput: Navigate to app\nExpected Output: Input textbox visible\nActual Output: Visible=${isVisible}\nStatus: ${isVisible ? 'Pass' : 'Fail'}\n`);
});

test('Pos_UI_0002 | Input field accepts text', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const input = page.getByRole('textbox', { name: /input your singlish text here/i });
  await input.fill('test');
  const value = await input.inputValue();
  console.log(`TC ID: Pos_UI_0002\nInput: Fill "test"\nExpected Output: Value="test"\nActual Output: Value="${value}"\nStatus: ${value === 'test' ? 'Pass' : 'Fail'}\n`);
});

test('Neg_UI_0001 | Entering extremely long continuous string (No spaces)', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const input = page.getByRole('textbox', { name: /input your singlish text here/i });
  
  // Create a very long continuous string
  const longString = 'A'.repeat(500);
  
  let status = 'Pass';
  let actual = 'App handled long string without crashing';
  
  try {
    await input.fill('');
    await input.fill(longString, { delay: 5 });
    await page.waitForTimeout(3000);
    
    // Check if app is still responsive
    const isEnabled = await input.isEnabled();
    if (!isEnabled) {
      status = 'Fail';
      actual = 'Input field became disabled';
    }
  } catch (error) {
    status = 'Fail';
    actual = error.message;
  }
  
  console.log(`TC ID: Neg_UI_0001\nInput: Extremely long continuous string (500 A's)\nExpected Output: System should handle the string without UI breaking or infinite loading.\nActual Output: ${actual}\nStatus: ${status}\n`);
});

