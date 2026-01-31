const { test, expect } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

async function openApp(page) {
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
}

async function getInputLocator(page) {
  return page.getByPlaceholder('Input Your Singlish Text Here.');
}

async function getOutputLocator(page) {
  return page.getByText('Sinhala', { exact: true }).locator('xpath=following-sibling::*[1]');
}

function logResult({ id, input, expected, actual, status }) {
  console.log(`TC ID: ${id}\nInput: ${input}\nExpected Output: ${expected}\nActual Output: ${actual}\nStatus: ${status}\n`);
}

test("Neg_Fun_0001 | Input with only special characters", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `@#$%^&*`;
  const expectedOutput = `@#$%^&*`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0001', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0002 | Transliterating non-Singlish (English sentences)", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `Please submit assignment before Friday.`;
  const expectedOutput = `Please submit assignment before Friday.`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0002', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0001 | GPS coordinate style numbers", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `location eka 7.8731N 80.7718E kiyala pennanavaa`;
  const expectedOutput = `location එක 7.8731N 80.7718E කියලා පෙන්නනවා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0001', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0002 | All-caps Singlish input not converted", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `LAWYER KIVVAA AGREEMENT EKA DIGITALLY SIGN KARANNA KIYALAA`;
  const expectedOutput = `lawyer කිව්වා agreement එක digitally sign කරන්න කියලා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0002', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0003 | All-caps question not converted", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `OYAATA KOHOMADHA`;
  const expectedOutput = `ඔයාට කොහොමද`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0003', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0004 | Mixed caps inside words breaks conversion", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `mama Gedhara Yanavaa Passe Ennam`;
  const expectedOutput = `මම ගෙදර යනවා පස්සේ එන්නම්`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0004', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0005 | URL inside sentence gets partially transliterated", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `mama link eka https://www.swifttranslator.com yanna kivvaa`;
  const expectedOutput = `මම link එක https://www.swifttranslator.com\n යන්න කිව්වා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0005', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0006 | ID-style code mixed sentence", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `mage ref ID ABX-9921 eka balanna`;
  const expectedOutput = `මගේ ref ID ABX-9921 එක බලන්න`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0006', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0007 | Joined words cause incorrect segmentation", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `mamagedharayanavaa`;
  const expectedOutput = `මම ගෙදර යනවා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0007', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0008 | Place name incorrectly transliterated", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `api anuraadhapurayee yanavaa`;
  const expectedOutput = `අපි අනුරාධපුරයේ යනවා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0008', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0009 | Place name not converted to Sinhala", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `api galle yanavaa`;
  const expectedOutput = `අපි ගාල්ලෙ යනවා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0009', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

test("Neg_Fun_0010 | Place name with uppercase letters misconverted", async ({ page }) => {
  await openApp(page);
  const inputArea = await getInputLocator(page);
  const outputArea = await getOutputLocator(page);

  const testInput = `apiANURADHAPURAYEEyanavaa`;
  const expectedOutput = `අපි අනුරාධපුරයේ යනවා`;

  await inputArea.fill(testInput);
  await page.waitForTimeout(2000);

  await expect(outputArea).not.toHaveText('');
  const actualOutput = (await outputArea.textContent()) ?? '';

  const passed = actualOutput.trim() === expectedOutput.trim();
  const status = passed ? 'Pass' : 'Fail';

  logResult({ 
    id: 'Neg_Fun_0010', 
    input: testInput, 
    expected: expectedOutput, 
    actual: actualOutput.trim(), 
    status 
  });

  expect(actualOutput.trim()).toBe(expectedOutput.trim());
});

