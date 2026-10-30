import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button, FieldValueList, FormField, Text, withConfiguration } from '@pega/cosmos-react-core';
import { StyledButtonWrapper } from './styles';
/* Small inline SVG icons: no icon-registry imports, so no Cosmos-version build issues */
const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  style: { marginRight: '0.5rem', flex: '0 0 auto' }
};
const ICONS: Record<string, ReactNode> = {
  refresh: (
    <svg {...svgProps}>
      <path d='M21 12a9 9 0 1 1-2.64-6.36' />
      <polyline points='21 3 21 9 15 9' />
    </svg>
  ),
  search: (
    <svg {...svgProps}>
      <circle cx='11' cy='11' r='7' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  ),
  check: (
    <svg {...svgProps}>
      <polyline points='20 6 9 17 4 12' />
    </svg>
  ),
  plus: (
    <svg {...svgProps}>
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  )
};

/* Minimal shape of the PConnect object this component uses (replaces `any`) */
type PConnLike = {
  getActionsApi: () => {
    updateFieldValue: (propName: string, value: unknown) => void;
    triggerFieldChange: (propName: string, value: unknown) => void;
  };
  getStateProps: () => { value: string };
  /** Pega localization helper; may not exist in every Pega version */
  getLocalizedValue?: (value: string, localePath?: string, localeReference?: string) => string;
};

export type BooleanButtonProps = {
  /** Standard field label (shown above the button when hideLabel is false) */
  label: string;
  /** Text on the button. Falls back to the field label when empty. */
  buttonLabel?: string;
  /** Property value. Can arrive as boolean, "true"/"false" string, 1/0, or null/empty. */
  value?: boolean | string | number | null;
  helperText?: string;
  validatemessage?: string;
  /** Can arrive as boolean or "true"/"false" string */
  hideLabel?: boolean | string;
  /** Can arrive as boolean or "true"/"false" string */
  readOnly?: boolean | string;
  /** Can arrive as boolean or "true"/"false" string (from Disabled condition in config) */
  disabled?: boolean | string;
  /** Can arrive as boolean or "true"/"false" string */
  required?: boolean | string;
  testId?: string;
  displayMode?: string;
  /* ---- Read-only display (from "Display Value" in config) ---- */
  /** 'Yes/No' | 'True/False'. Default 'Yes/No' */
  displayValue?: string;
  /* ---- Design options (all optional) ---- */
  /** primary | secondary | simple */
  variant?: 'primary' | 'secondary' | 'simple';
  /** left | center | right */
  alignment?: 'left' | 'center' | 'right';
  /** Stretch button to the full width of the field. Can arrive as boolean or string */
  fullWidth?: boolean | string;
  /** none | refresh | search | check | plus */
  icon?: 'none' | 'refresh' | 'search' | 'check' | 'plus';
  /** Hover tooltip */
  tooltip?: string;
  /** Any valid CSS color, e.g. #0a6ed1 */
  backgroundColor?: string;
  textColor?: string;
  /** Any valid CSS length, e.g. 8px or 999px */
  borderRadius?: string;
  /* ---- Behavior options ---- */
  /** toggle: every click flips true/false. alwaysTrue: every click sets true. */
  valueBehavior?: 'toggle' | 'alwaysTrue';
  getPConnect: () => PConnLike;
};

/* Handles true, "true", 1 and "1" */
const toBoolean = (v: BooleanButtonProps['value']): boolean =>
  v === true ||
  v === 1 ||
  (typeof v === 'string' && ['true', '1'].includes(v.trim().toLowerCase()));
/* readOnly / disabled / required / hideLabel / fullWidth can arrive as boolean or the string "true"/"false" */
const toFlag = (v: boolean | string | undefined): boolean =>
  v === true || String(v).trim().toLowerCase() === 'true';
/* Read-only text for each "Display Value" dropdown option */
const DISPLAY_LABELS: Record<string, { trueText: string; falseText: string }> = {
  'Yes/No': { trueText: 'Yes', falseText: 'No' },
  'True/False': { trueText: 'True', falseText: 'False' }
};
/* Display modes Pega uses when the field must be shown as text, not as a clickable control */
const READ_ONLY_DISPLAY_MODES = ['DISPLAY_ONLY', 'LABELS_LEFT', 'STACKED_LARGE_VAL'];
/* Clicks closer together than this are ignored, so a double-click can't flip the value twice */
const CLICK_GUARD_MS = 400;
const ALIGN = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;
/* Only pass values the browser accepts as valid CSS, so bad config never breaks styling */
const safeCss = (prop: string, v?: string): string | undefined => {
  const value = v?.trim();
  if (!value) return undefined;
  try {
    return typeof CSS !== 'undefined' && CSS.supports(prop, value) ? value : undefined;
  } catch {
    return undefined;
  }
};
const PegaExtensionsBooleanButton = (props: BooleanButtonProps) => {
  const {
    label,
    buttonLabel,
    value,
    helperText,
    validatemessage,
    hideLabel: hideLabelProp,
    readOnly: readOnlyProp = false,
    disabled: disabledProp = false,
    required: requiredProp = false,
    testId,
    displayMode,
    displayValue = 'Yes/No',
    variant = 'primary',
    alignment = 'left',
    fullWidth: fullWidthProp = false,
    icon = 'none',
    tooltip,
    backgroundColor,
    textColor,
    borderRadius,
    valueBehavior = 'toggle',
    getPConnect
  } = props;
  // hideLabel defaults to true when not provided
  const hideLabel = hideLabelProp === undefined ? true : toFlag(hideLabelProp);
  const readOnly = toFlag(readOnlyProp);
  const disabled = toFlag(disabledProp);
  const required = toFlag(requiredProp);
  const fullWidth = toFlag(fullWidthProp);
  // Button text from config: custom button label first, otherwise the field label
  const text = (buttonLabel && buttonLabel.trim()) || label;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  // e.g. ".RefreshFlag" - the property bound to this field in the form
  const propName: string = pConn.getStateProps().value;
  // Uses Pega localization when available, otherwise keeps the English text
  const localize = (s: string): string => {
    try {
      return pConn.getLocalizedValue?.(s, '', '') || s;
    } catch {
      return s;
    }
  };
  // Tracks the current value so rapid clicks always behave correctly
  const current = useRef<boolean>(toBoolean(value));
  // Time of the last accepted click (see CLICK_GUARD_MS)
  const lastClick = useRef<number>(0);
  useEffect(() => {
    current.current = toBoolean(value);
  }, [value]);
  // Read-only / display-only (review, summary, locked forms)
  if (READ_ONLY_DISPLAY_MODES.includes(displayMode ?? '') || readOnly) {
    const labels = DISPLAY_LABELS[displayValue] ?? DISPLAY_LABELS['Yes/No'];
    // true -> trueText; false, null or empty -> falseText
    const displayText = localize(toBoolean(value) ? labels.trueText : labels.falseText);
    const largeValue = displayMode === 'STACKED_LARGE_VAL';
    return (
      <FieldValueList
        variant={displayMode === 'LABELS_LEFT' ? 'inline' : 'stacked'}
        data-testid={testId}
        fields={[
          {
            id: 'value',
            name: hideLabel ? '' : label,
            value: largeValue ? (
              <Text variant='h1' as='span'>
                {displayText}
              </Text>
            ) : (
              displayText
            )
          }
        ]}
      />
    );
  }
  const handleClick = () => {
    // Safety guard: a disabled button must never write a value
    if (disabled) return;
    // Ignore a second click that arrives right after the first (double-click)
    const now = Date.now();
    if (now - lastClick.current < CLICK_GUARD_MS) return;
    lastClick.current = now;
    // toggle: flips every click so a field-change always fires.
    // alwaysTrue: sets true (reset it in your activity / data transform).
    const next = valueBehavior === 'alwaysTrue' ? true : !current.current;
    current.current = next;
    actions.updateFieldValue(propName, next);
    actions.triggerFieldChange(propName, next);
  };
  return (
    <FormField
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      status={validatemessage ? 'error' : undefined}
      required={required}
      testId={testId}
    >
      <StyledButtonWrapper
        $align={ALIGN[alignment] ?? ALIGN.left}
        $fullWidth={fullWidth}
        $bg={safeCss('background-color', backgroundColor)}
        $color={safeCss('color', textColor)}
        $radius={safeCss('border-radius', borderRadius)}
        $disabled={disabled}
      >
        <Button
          type='button'
          variant={variant}
          disabled={disabled}
          title={tooltip || undefined}
          aria-pressed={valueBehavior === 'toggle' ? toBoolean(value) : undefined}
          onClick={handleClick}
        >
          {icon !== 'none' && ICONS[icon]}
          {text}
        </Button>
      </StyledButtonWrapper>
    </FormField>
  );
};
export default withConfiguration(PegaExtensionsBooleanButton);
