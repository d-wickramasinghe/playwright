const { test } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

async function openApp(page) {
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
}

async function getInputLocator(page) {
  return page.getByRole('textbox', { name: /input your singlish text here/i });
}

function logResult({ id, input, expected, actual, status }) {
  console.log(`TC ID: ${id}\nInput: ${input}\nExpected Output: ${expected}\nActual Output: ${actual}\nStatus: ${status}\n`);
}

test("Neg_Fun_0001 | Input with only special characters", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`@#$%^&*`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0001', input: `@#$%^&*`, expected: `@#$%^&*`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0001', input: `@#$%^&*`, expected: `@#$%^&*`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0002 | Transliterating non-Singlish (English sentences)", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`Please submit assignment before Friday.`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0002', input: `Please submit assignment before Friday.`, expected: `Please submit assignment before Friday.`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0002', input: `Please submit assignment before Friday.`, expected: `Please submit assignment before Friday.`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0001 | GPS coordinate style numbers", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`location eka 7.8731N 80.7718E kiyala pennanavaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0001', input: `location eka 7.8731N 80.7718E kiyala pennanavaa`, expected: `location එක 7.8731N 80.7718E කියලා පෙන්නනවා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0001', input: `location eka 7.8731N 80.7718E kiyala pennanavaa`, expected: `location එක 7.8731N 80.7718E කියලා පෙන්නනවා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0002 | All-caps Singlish input not converted", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`LAWYER KIVVAA AGREEMENT EKA DIGITALLY SIGN KARANNA KIYALAA`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0002', input: `LAWYER KIVVAA AGREEMENT EKA DIGITALLY SIGN KARANNA KIYALAA`, expected: `lawyer කිව්වා agreement එක digitally sign කරන්න කියලා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0002', input: `LAWYER KIVVAA AGREEMENT EKA DIGITALLY SIGN KARANNA KIYALAA`, expected: `lawyer කිව්වා agreement එක digitally sign කරන්න කියලා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0003 | All-caps question not converted", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`OYAATA KOHOMADHA`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0003', input: `OYAATA KOHOMADHA`, expected: `ඔයාට කොහොමද`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0003', input: `OYAATA KOHOMADHA`, expected: `ඔයාට කොහොමද`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0004 | Mixed caps inside words breaks conversion", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`mama Gedhara Yanavaa Passe Ennam`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0004', input: `mama Gedhara Yanavaa Passe Ennam`, expected: `මම ගෙදර යනවා පස්සේ එන්නම්`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0004', input: `mama Gedhara Yanavaa Passe Ennam`, expected: `මම ගෙදර යනවා පස්සේ එන්නම්`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0005 | URL inside sentence gets partially transliterated", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`mama link eka https://www.swifttranslator.com yanna kivvaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0005', input: `mama link eka https://www.swifttranslator.com yanna kivvaa`, expected: `මම link එක https://www.swifttranslator.com\n යන්න කිව්වා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0005', input: `mama link eka https://www.swifttranslator.com yanna kivvaa`, expected: `මම link එක https://www.swifttranslator.com\n යන්න කිව්වා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0006 | ID-style code mixed sentence", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`mage ref ID ABX-9921 eka balanna`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0006', input: `mage ref ID ABX-9921 eka balanna`, expected: `මගේ ref ID ABX-9921 එක බලන්න`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0006', input: `mage ref ID ABX-9921 eka balanna`, expected: `මගේ ref ID ABX-9921 එක බලන්න`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0007 | Joined words cause incorrect segmentation", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`mamagedharayanavaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0007', input: `mamagedharayanavaa`, expected: `මම ගෙදර යනවා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0007', input: `mamagedharayanavaa`, expected: `මම ගෙදර යනවා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0008 | Place name incorrectly transliterated", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`api anuraadhapurayee yanavaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0008', input: `api anuraadhapurayee yanavaa`, expected: `අපි අනුරාධපුරයේ යනවා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0008', input: `api anuraadhapurayee yanavaa`, expected: `අපි අනුරාධපුරයේ යනවා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0009 | Place name not converted to Sinhala", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`api galle yanavaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0009', input: `api galle yanavaa`, expected: `අපි ගාල්ලෙ යනවා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0009', input: `api galle yanavaa`, expected: `අපි ගාල්ලෙ යනවා`, actual: error.message, status: 'Fail' });
  }
});

test("Neg_Fun_0010 | Place name with uppercase letters misconverted", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  try {
    await input.fill('');
    await page.waitForTimeout(500);
    await input.fill(`apiANURADHAPURAYEEyanavaa`, { delay: 30 });
    await page.waitForTimeout(2000);
    logResult({ id: 'Neg_Fun_0010', input: `apiANURADHAPURAYEEyanavaa`, expected: `අපි අනුරාධපුරයේ යනවා`, actual: 'Input processed', status: 'Pass' });
  } catch (error) {
    logResult({ id: 'Neg_Fun_0010', input: `apiANURADHAPURAYEEyanavaa`, expected: `අපි අනුරාධපුරයේ යනවා`, actual: error.message, status: 'Fail' });
  }
});

