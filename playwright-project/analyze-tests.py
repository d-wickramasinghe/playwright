import json

with open('test-cases.json', encoding='utf-8') as f:
    data = json.load(f)

tests = [t for t in data if t['TC ID']]
pos_fun = [t for t in tests if t['TC ID'].startswith('Pos_Fun_')]
neg_fun = [t for t in tests if t['TC ID'].startswith('Neg_Fun_')]
pos_ui = [t for t in tests if t['TC ID'].startswith('Pos_UI_')]
neg_ui = [t for t in tests if t['TC ID'].startswith('Neg_UI_')]

print(f'Total test cases: {len(tests)}')
print(f'Positive Functional: {len(pos_fun)}')
print(f'Negative Functional: {len(neg_fun)}')
print(f'Positive UI: {len(pos_ui)}')
print(f'Negative UI: {len(neg_ui)}')

print('\nFirst 10 Positive Functional:')
for t in pos_fun[:10]:
    print(f"{t['TC ID']}: {t['Input'][:60]}")

print('\nFirst 10 Negative Functional:')
for t in neg_fun[:10]:
    print(f"{t['TC ID']}: {t['Input'][:60]}")
