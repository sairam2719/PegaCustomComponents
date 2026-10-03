# PegaExtensionsBooleanButton

A Pega Constellation **DX component** for **Boolean** fields. Instead of a checkbox or toggle, the field renders as a **button**. Each click updates the bound True/False property and fires a field change, so the button works as a **refresh** or **search** button in form view.

---

## Files

| File | Purpose |
|------|---------|
| `config.json` | Component definition and the properties users configure in Pega |
| `index.tsx` | React component (Cosmos `Button`, `FormField`, `FieldValueList`) |
| `styles.ts` | styled-components for width, alignment and optional color overrides |
| `demo.stories.tsx` | Storybook story with a control for every option |

---

## Features

### 1. Boolean field shown as a button
- Field type **Field**, subtype **Boolean**, so it can be chosen for any True/False property in form view.
- Compact by default: the button is only as wide as its label, not the full width of the form.

### 2. Click behavior (refresh / search)
- Every click updates the property and calls `updateFieldValue` followed by `triggerFieldChange`.
- Refresh-when conditions, on-change actions, data transforms, activities and validations run on each click.
- **On click** option:
  - **Toggle true/false** (default): every click flips the value, so a field change always fires.
  - **Always set true**: every click sets `true`. Reset the property in your activity or data transform so the next click registers.
- The button looks the same before and after a click: one color, no pressed or selected state.

### 3. Dynamic button label
- **Button label** sets the text shown on the button (for example `Search` or `Policy`).
- If Button label is empty, the field's own **Label** is used.
- Nothing is hard-coded, so changing the label changes the button text.

### 4. Helper text and validation
- **Helper text** appears under the button.
- Validation messages replace the helper text and show the field in an error state.
- The **required** marker is supported.
- **Hide label** hides the field label above the button. It is on by default because the button text already acts as the label.

### 5. Design options (configurable)

| Property | Values |
|----------|--------|
| Variant | Primary, Secondary, Simple |
| Alignment | Left, Center, Right |
| Icon | None, Refresh, Search, Check, Plus (inline SVG, no icon imports) |
| Full width | On / Off |
| Background color | Any valid CSS color, e.g. `#0a6ed1` |
| Text color | Any valid CSS color |
| Border radius | Any valid CSS length, e.g. `8px` or `999px` |
| Tooltip | Text shown on hover |

Invalid CSS values are ignored, so a typo can't break the button.

### 6. Other modes
- **Disabled**: the button is greyed out and does not respond to clicks.
- **Read-only / display-only**: shows `Yes` or `No` as a plain field value instead of a button, for review and locked forms.

---

## Properties in `config.json`

**Content:** `label`, `buttonLabel`, `helperText`, `tooltip`, `hideLabel`

**Button style (group):** `variant`, `alignment`, `icon`, `fullWidth`, `backgroundColor`, `textColor`, `borderRadius`

**Behavior (group):** `valueBehavior` (`toggle` or `alwaysTrue`)

Default config on a new field: label and button label follow the field label, hide label on, primary variant, left aligned, no icon, toggle behavior.

---

## How to use it in Pega

1. Place the folder in your Constellation DX component project, for example under `src/components/`.
2. Build and publish:
   ```
   npm run buildComponent
   npm run publishComponent
   ```
3. Create a True/False property, for example `.RefreshFlag`.
4. On the form, set the field's display component to **Boolean button**.
5. Fill in Button label, Helper text and the style options.
6. Add your refresh-when condition or on-change action on that field to run the search or reload.

Fields already on a form keep their old saved config. Remove and re-add the field after publishing a new version to see the new properties.

---

## Testing in Storybook

Run Storybook and open **Extensions > Boolean button > Default**. The Controls panel has an input for every option above, and the story shows the current property value under the button.

---

## Adding new options later

1. Add the property to `config.json`.
2. Add it to the `BooleanButtonProps` type in `index.tsx` and use it in the component.
3. For visual changes, add a styled-components prop in `styles.ts`.
4. Add a matching control to `argTypes` in `demo.stories.tsx`.

---

## Naming

The component uses the default `PegaExtensionsBooleanButton` name with organization `Pega` and library `Extensions`. Rename `name` and `componentKey` in `config.json` and the folder to match your own organization and library.
