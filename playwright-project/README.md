# Playwright Functional & UI Tests – SwiftTranslator

Academic assignment: IT3040 – ITPM (Year 3)

## Target Application
https://www.swifttranslator.com/

## Tech Stack
- Node.js (recommended: v18 or later)
- Playwright (JavaScript)
- Chromium only

## Project Structure
- playwright.config.js
- package.json
- tests/
  - positiveFunctional.spec.js
  - negativeFunctional.spec.js
  - ui.spec.js

## Setup
1. Install Node.js (v18+ recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers (Chromium):
   ```bash
   npx playwright install chromium
   ```

## Run Tests
```bash
npx playwright test
```

## View Test Report
After test execution, open the HTML report:
```bash
npx playwright show-report
```

## Notes
- Each test navigates to the target URL, enters Singlish input, and validates real-time Sinhala output.
- Console logs include TC ID, Input, Expected Output, Actual Output, and Status for every test case.
- Negative tests assert that the actual output does **not** match the (intentionally incorrect) expected output.
