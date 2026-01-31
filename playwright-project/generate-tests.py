import json

# Read test cases
with open('test-cases.json', encoding='utf-8') as f:
    data = json.load(f)

tests = [t for t in data if t['TC ID']]
pos_fun = [t for t in tests if t['TC ID'].startswith('Pos_Fun_')]
neg_fun = [t for t in tests if t['TC ID'].startswith('Neg_Fun_')]
pos_ui = [t for t in tests if t['TC ID'].startswith('Pos_UI_')]
neg_ui = [t for t in tests if t['TC ID'].startswith('Neg_UI_')]

# Generate positiveFunctional.spec.js
with open('tests/positiveFunctional.spec.js', 'w', encoding='utf-8') as f:
    f.write("""const { test, expect } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

async function openApp(page) {
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
}

async function getInputLocator(page) {
  return page.getByRole('textbox', { name: /input your singlish text here/i });
}

async function getOutputLocator(page) {
  // The output appears in a div after typing
  return page.locator('[class*="output"], [id*="output"]').or(page.locator('div').filter({ hasText: /[අ-ෆ]/ })).first();
}

async function readOutput(locator) {
  const text = await locator.textContent().catch(() => '');
  return text.trim();
}

function logResult({ id, input, expected, actual, status }) {
  console.log(`TC ID: ${id}\\nInput: ${input}\\nExpected Output: ${expected}\\nActual Output: ${actual}\\nStatus: ${status}\\n`);
}

async function assertAndLogPositive({ id, input, expected, inputLocator, outputLocator }) {
  let actual = '';
  let status = 'Fail';
  let error;

  try {
    await inputLocator.fill('');
    await inputLocator.fill(input, { delay: 20 });
    await expect.poll(() => readOutput(outputLocator), { timeout: 10000 }).toContain(expected);
    actual = await readOutput(outputLocator);
    status = 'Pass';
  } catch (err) {
    actual = await readOutput(outputLocator);
    error = err;
  } finally {
    logResult({ id, input, expected, actual, status });
  }

  if (error) throw error;
}

""")
    
    for tc in pos_fun:
        tc_id = tc['TC ID']
        tc_name = tc['Test case name']
        input_text = tc['Input']
        expected = tc['Expected output']
        
        f.write(f"""test('{tc_id} | {tc_name}', async ({{ page }}) => {{
  await openApp(page);
  const input = await getInputLocator(page);
  const output = await getOutputLocator(page);

  await assertAndLogPositive({{
    id: '{tc_id}',
    input: `{input_text}`,
    expected: `{expected}`,
    inputLocator: input,
    outputLocator: output,
  }});
}});

""")

# Generate negativeFunctional.spec.js
with open('tests/negativeFunctional.spec.js', 'w', encoding='utf-8') as f:
    f.write("""const { test, expect } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

async function openApp(page) {
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
}

async function getInputLocator(page) {
  return page.getByRole('textbox', { name: /input your singlish text here/i });
}

async function getOutputLocator(page) {
  return page.locator('[class*="output"], [id*="output"]').or(page.locator('div').filter({ hasText: /[අ-ෆ]/ })).first();
}

async function readOutput(locator) {
  const text = await locator.textContent().catch(() => '');
  return text.trim();
}

function logResult({ id, input, expected, actual, status }) {
  console.log(`TC ID: ${id}\\nInput: ${input}\\nExpected Output: ${expected}\\nActual Output: ${actual}\\nStatus: ${status}\\n`);
}

async function assertAndLogNegative({ id, input, expected, inputLocator, outputLocator }) {
  let actual = '';
  let status = 'Fail';
  let error;

  try {
    await inputLocator.fill('');
    await inputLocator.fill(input, { delay: 20 });
    await page.waitForTimeout(2000);
    actual = await readOutput(outputLocator);
    
    // Negative test: assert that actual does NOT match expected
    await expect(actual).not.toBe(expected);
    status = 'Pass';
  } catch (err) {
    actual = await readOutput(outputLocator);
    error = err;
  } finally {
    logResult({ id, input, expected, actual, status });
  }

  if (error) throw error;
}

""")
    
    for tc in neg_fun:
        tc_id = tc['TC ID']
        tc_name = tc['Test case name']
        input_text = tc['Input']
        expected = tc['Expected output']
        
        f.write(f"""test('{tc_id} | {tc_name}', async ({{ page }}) => {{
  await openApp(page);
  const input = await getInputLocator(page);
  const output = await getOutputLocator(page);

  await assertAndLogNegative({{
    id: '{tc_id}',
    input: `{input_text}`,
    expected: `{expected}`,
    inputLocator: input,
    outputLocator: output,
  }});
}});

""")

# Generate ui.spec.js
with open('tests/ui.spec.js', 'w', encoding='utf-8') as f:
    f.write("""const { test, expect } = require('@playwright/test');

const APP_URL = 'https://www.swifttranslator.com/';

async function openApp(page) {
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
}

async function getInputLocator(page) {
  return page.getByRole('textbox', { name: /input your singlish text here/i });
}

async function getOutputLocator(page) {
  return page.locator('[class*="output"], [id*="output"]').or(page.locator('div').filter({ hasText: /[අ-ෆ]/ })).first();
}

async function readOutput(locator) {
  const text = await locator.textContent().catch(() => '');
  return text.trim();
}

function logResult({ id, input, expected, actual, status }) {
  console.log(`TC ID: ${id}\\nInput: ${input}\\nExpected Output: ${expected}\\nActual Output: ${actual}\\nStatus: ${status}\\n`);
}

""")
    
    for tc in pos_ui + neg_ui:
        tc_id = tc['TC ID']
        tc_name = tc['Test case name']
        input_text = tc['Input']
        expected = tc['Expected output']
        is_negative = tc_id.startswith('Neg_')
        
        f.write(f"""test('{tc_id} | {tc_name}', async ({{ page }}) => {{
  await openApp(page);
  const input = await getInputLocator(page);
  const output = await getOutputLocator(page);

  await input.fill('');
  await input.fill(`{input_text}`, {{ delay: 20 }});
  await page.waitForTimeout(2000);
  
  const actual = await readOutput(output);
  const expected = `{expected}`;
  
  try {{
    {'await expect(actual).not.toBe(expected);' if is_negative else 'await expect(actual).toContain(expected);'}
    logResult({{ id: '{tc_id}', input: `{input_text}`, expected, actual, status: 'Pass' }});
  }} catch (error) {{
    logResult({{ id: '{tc_id}', input: `{input_text}`, expected, actual, status: 'Fail' }});
    throw error;
  }}
}});

""")

print('Generated test files:')
print(f'  - positiveFunctional.spec.js ({len(pos_fun)} tests)')
print(f'  - negativeFunctional.spec.js ({len(neg_fun)} tests)')
print(f'  - ui.spec.js ({len(pos_ui) + len(neg_ui)} tests)')
