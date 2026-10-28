import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button, FormControl, withConfiguration } from '@pega/cosmos-react-core';
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

/* Props are defined here (no PConnProps.d.ts needed) */
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
  testId?: string;
  displayMode?: string;
  additionalProps?: Record<string, any>;

  /* Standard Pega flags: resolved by Constellation (including the field's
     Disabled / Read-only conditions and when rules). Can be boolean or "true"/"false". */
  readOnly?: boolean | string;
  disabled?: boolean | string;
  required?: boolean | string;

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

// interface for StateProps object
interface StateProps {
  value: string;
}

/* Same as the toggle's handleEvent(actions, 'changeNblur', propName, value) - inlined, no event-utils file */
const handleEvent = (actions: any, propName: string, next: boolean) => {
  actions.updateFieldValue(propName, next);
  actions.triggerFieldChange(propName, next);
};

// props passed in combination of props from property panel (config.json) and run time props from Constellation
function PegaExtensionsBooleanButton(props: BooleanButtonProps) {
  const {
    getPConnect,
    value = false,
    label = '',
    helperText = '',
    buttonLabel,
    validatemessage,
    hideLabel = true,
    testId,
    additionalProps = {},
    displayMode,
    tooltip,
    variant = 'primary',
    alignment = 'left',
    fullWidth = false,
    icon = 'none',
    backgroundColor,
    textColor,
    borderRadius,
    valueBehavior = 'toggle'
  } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  // identical to the toggle component
  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const status: 'error' | 'success' | 'warning' | 'pending' | undefined = validatemessage ? 'error' : undefined;

  // Button text: custom button label first, otherwise the field label
  const text = (buttonLabel && buttonLabel.trim()) || label;

  const parentTestId = testId ? `${testId}-parent` : 'boolean-button-parent';

  // Tracks the current value so rapid clicks always behave correctly
  const current = useRef<boolean>(value === true || value === 'true');
  useEffect(() => {
    current.current = value === true || value === 'true';
  }, [value]);

  // Read-only / display-only: show nothing
  if (displayMode === 'DISPLAY_ONLY' || displayMode === 'LABELS_LEFT' || displayMode === 'STACKED_LARGE_VAL') {
    return null;
  }

  const handleClick = () => {
    const next = valueBehavior === 'alwaysTrue' ? true : !current.current;
    current.current = next;
    handleEvent(actions, propName, next);
  };

  return (
    <FormControl
      label={label}
      labelHidden={hideLabel}
      data-testid={parentTestId}
      info={validatemessage || helperText}
      status={status}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    >
      <StyledButtonWrapper
        $align={ALIGN[alignment] ?? ALIGN.left}
        $fullWidth={fullWidth}
        $bg={safeCss('background-color', backgroundColor)}
        $color={safeCss('color', textColor)}
        $radius={safeCss('border-radius', borderRadius)}
      >
        <Button
          {...additionalProps}
          type='button'
          variant={variant}
          disabled={disabled}
          data-testid={testId}
          title={tooltip || undefined}
          onClick={handleClick}
        >
          {icon !== 'none' && ICONS[icon]}
          {text}
        </Button>
      </StyledButtonWrapper>
    </FormControl>
  );
}

export default withConfiguration(PegaExtensionsBooleanButton);
