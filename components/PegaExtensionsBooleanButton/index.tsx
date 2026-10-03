import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button, FieldValueList, FormField, withConfiguration } from '@pega/cosmos-react-core';
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

export type BooleanButtonProps = {
  /** Standard field label (shown above the button when hideLabel is false) */
  label: string;
  /** Text on the button. Falls back to the field label when empty. */
  buttonLabel?: string;
  /** Property value. Can arrive as boolean or "true"/"false" string. */
  value?: boolean | string | null;
  helperText?: string;
  validatemessage?: string;
  hideLabel?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  testId?: string;
  displayMode?: string;

  /* ---- Design options (all optional) ---- */
  /** primary | secondary | simple */
  variant?: 'primary' | 'secondary' | 'simple';
  /** left | center | right */
  alignment?: 'left' | 'center' | 'right';
  /** Stretch button to the full width of the field */
  fullWidth?: boolean;
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

  getPConnect: () => any;
};

const toBoolean = (v: BooleanButtonProps['value']): boolean =>
  v === true || (typeof v === 'string' && v.toLowerCase() === 'true');

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
    hideLabel = true,
    readOnly = false,
    disabled = false,
    required = false,
    testId,
    displayMode,
    variant = 'primary',
    alignment = 'left',
    fullWidth = false,
    icon = 'none',
    tooltip,
    backgroundColor,
    textColor,
    borderRadius,
    valueBehavior = 'toggle',
    getPConnect
  } = props;

  // Button text from config: custom button label first, otherwise the field label
  const text = (buttonLabel && buttonLabel.trim()) || label;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  // e.g. ".RefreshFlag" - the property bound to this field in the form
  const propName: string = pConn.getStateProps().value;

  // Tracks the current value so rapid clicks always behave correctly
  const current = useRef<boolean>(toBoolean(value));
  useEffect(() => {
    current.current = toBoolean(value);
  }, [value]);

  // Read-only / display-only (review, summary, locked forms)
  if (displayMode === 'DISPLAY_ONLY' || displayMode === 'LABELS_LEFT' || readOnly) {
    return (
      <FieldValueList
        variant={displayMode === 'LABELS_LEFT' ? 'inline' : 'stacked'}
        data-testid={testId}
        fields={[{ id: 'value', name: hideLabel ? '' : label, value: current.current ? 'Yes' : 'No' }]}
      />
    );
  }

  const handleClick = () => {
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
      >
        <Button
          type='button'
          variant={variant}
          disabled={disabled}
          title={tooltip || undefined}
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
