import json

data = json.load(open('test-cases.json', encoding='utf-8'))
neg_ui = [t for t in data if t['TC ID'].startswith('Neg_UI_')]

print("Negative UI Tests:")
for t in neg_ui:
    print(f"\nTC ID: {t['TC ID']}")
    print(f"Name: {t['Test case name']}")
    print(f"Input: {t['Input']}")
    print(f"Expected: {t['Expected output']}")
