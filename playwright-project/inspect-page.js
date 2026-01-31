const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  
  // Find all textboxes
  const textboxes = await page.getByRole('textbox').all();
  console.log(`\nFound ${textboxes.length} textboxes:`);
  
  for (let i = 0; i < textboxes.length; i++) {
    const name = await textboxes[i].getAttribute('aria-label') || await textboxes[i].getAttribute('placeholder') || 'no label';
    const value = await textboxes[i].inputValue().catch(() => 'N/A');
    console.log(`  [${i}] ${name} = "${value}"`);
  }
  
  // Find all contenteditable
  const editables = await page.locator('[contenteditable="true"]').all();
  console.log(`\nFound ${editables.length} contenteditable elements`);
  
  for (let i = 0; i < editables.length; i++) {
    const text = await editables[i].textContent();
    console.log(`  [${i}] content = "${text.substring(0, 50)}"`);
  }
  
  // Type in first textbox
  console.log('\n--- Typing "amma" in first textbox ---');
  await textboxes[0].fill('amma');
  await page.waitForTimeout(5000);
  
  // Re-check textboxes
  const textboxes2 = await page.getByRole('textbox').all();
  console.log(`\nAfter typing, found ${textboxes2.length} textboxes:`);
  for (let i = 0; i < textboxes2.length; i++) {
    const name = await textboxes2[i].getAttribute('aria-label') || await textboxes2[i].getAttribute('placeholder') || 'no label';
    const value = await textboxes2[i].inputValue().catch(() => 'N/A');
    console.log(`  [${i}] ${name} = "${value}"`);
  }
  
  // Re-check editables
  const editables2 = await page.locator('[contenteditable="true"]').all();
  console.log(`\nAfter typing, found ${editables2.length} contenteditable elements`);
  for (let i = 0; i < editables2.length; i++) {
    const text = await editables2[i].textContent();
    console.log(`  [${i}] = "${text}"`);
  }
  
  // Check divs/spans with Sinhala text
  const sinhalaPattern = /[අ-ෆ]/;
  const allDivs = await page.locator('div, span, p').all();
  console.log(`\nSearching for Sinhala output in ${allDivs.length} elements...`);
  let foundCount = 0;
  for (let i = 0; i < allDivs.length && foundCount < 10; i++) {
    const text = await allDivs[i].textContent().catch(() => '');
    if (text && sinhalaPattern.test(text) && text.length < 100) {
      console.log(`  Found Sinhala: "${text}"`);
      foundCount++;
    }
  }
  
  // Find the Sinhala section
  console.log('\n--- Searching for Sinhala output section ---');
  const sinhalSection = page.locator('text=Sinhala').first();
  const sinhalaBox = await sinhalSection.locator('..').locator('div, span, p').filter({ hasText: /[අ-ෆ]/ }).first();
  const sinhalaText = await sinhalaBox.textContent().catch(() => 'NOT FOUND');
  console.log(`Sinhala section text: "${sinhalaText}"`);
  
  // Try to get just the first Sinhala word
  const matches = sinhalaText.match(/[අ-ෆ්]+/g);
  if (matches) {
    console.log(`First Sinhala words: ${matches.slice(0, 5).join(', ')}`);
  }
  
  await browser.close();
})().catch(console.error);
