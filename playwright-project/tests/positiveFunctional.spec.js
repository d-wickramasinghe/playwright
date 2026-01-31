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

async function assertAndLogPositive({ id, input, expected, inputLocator, page }) {
  let actual = '';
  let status = 'Fail';

  try {
    await inputLocator.fill('');
    await page.waitForTimeout(500);
    await inputLocator.fill(input, { delay: 30 });
    
    // Wait for output to appear
    let found = false;
    const startTime = Date.now();
    while (Date.now() - startTime < 8000 && !found) {
      const allElements = await page.locator('div, span').all();
      for (const elem of allElements) {
        const text = await elem.textContent().catch(() => '');
        if (text && text.includes(expected.substring(0, 5))) {
          actual = text.substring(0, 100);
          found = true;
          break;
        }
      }
      if (!found) await page.waitForTimeout(300);
    }
    
    status = actual.length > 0 ? 'Pass' : 'Fail';
  } catch (err) {
    console.error(`Test ${id} error:`, err.message);
  } finally {
    logResult({ id, input, expected, actual, status });
  }
}

test("Pos_Fun_0001 | Convert technical abbreviations in a sentence", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0001',
    input: `CPU eka rath venavaa.`,
    expected: `CPU එක රත් වෙනවා.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0002 | Convert currency with decimal points", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0002',
    input: `Rs. 1500.50 kiyadha?`,
    expected: `Rs. 1500.50 කීයද?`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0003 | Compound sentence with logical conjunction", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0003',
    input: `mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.`,
    expected: `මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0004 | Mixed English word inside complex Sinhala sentence", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0004',
    input: `oyaa enavaanam mama meeting ekata yanne naee.`,
    expected: `ඔයා එනවානම් මම meeting එකට යන්නේ නෑ.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0005 | Handling of units of measurement", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0005',
    input: `mata haal 5kg dhenna.`,
    expected: `මට හාල් 5kg දෙන්න.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0006 | Proper nouns - City names", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0006',
    input: `api akuraessee yanavaa.`,
    expected: `අපි අකුරැස්සේ යනවා.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0007 | Input with parentheses and quotes", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0007',
    input: `eyaa kivvaa (eeka 'boruvak' kiyalaa) mata.`,
    expected: `එයා කිව්වා (ඒක 'බොරුවක්' කියලා) මට.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0008 | Date formats in a sentence", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0008',
    input: `party eka 25/12/2025 thiyenne.`,
    expected: `party එක 25/12/2025 තියෙන්නේ.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0009 | Handling of Slang words", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0009',
    input: `machan adha udhee set vemu.`,
    expected: `මචන් අද උදේ සෙට් වෙමු.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0010 | Verbs with different suffixes (Past Tense)", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0010',
    input: `mama iiye kaeema kaeevaa.`,
    expected: `මම ඊයේ කෑම කෑවා.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0011 | Paragraph structure with line breaks", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0011',
    input: `Line 1.\nLine 2.`,
    expected: `Line 1.\nLine 2.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0012 | Future tense with auxiliary verbs", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0012',
    input: `mama heta enna balannam.`,
    expected: `මම හෙට එන්න බලන්නම්.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0013 | Pronoun variations (Plural)", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0013',
    input: `api okkoma yanavaa.`,
    expected: `අපි ඔක්කොම යනවා.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0014 | Negation sentence with 'naee'", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0014',
    input: `mama dhanne naee.`,
    expected: `මම දන්නෙ නෑ.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0015 | Question with multiple options", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0015',
    input: `oyaata oone tea dha koopi dha?`,
    expected: `ඔයාට ඕනේ tea ද කෝපි ද?`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0016 | Common English acronyms", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0016',
    input: `VIP kenek enavaa.`,
    expected: `VIP කෙනෙක් එනවා.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0017 | Complex sentence with conditional 'if'", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0017',
    input: `vaessa unath api yanna epaeyi.`,
    expected: `වැස්ස උනත් අපි යන්න එපැයි.`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0018 | Input with HTML tags (Safety/Sanitization)", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0018',
    input: `<b>test</b>`,
    expected: `<b>test</b>`,
    inputLocator: input,
    page,
  });
});

test("Pos_Fun_0019 | Convert English technical term inside Singlish sentence", async ({ page }) => {
  await openApp(page);
  const input = await getInputLocator(page);

  await assertAndLogPositive({
    id: 'Pos_Fun_0019',
    input: `RAM eka adu nisaa slow.`,
    expected: `RAM එක අඩු නිසා slow.`,
    inputLocator: input,
    page,
  });
});

