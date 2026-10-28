import {
  FormControl,
  FieldValueList,
  Switch as CosmosSwitch,
  Text,
  withConfiguration,
  BooleanDisplay
} from "@pega/cosmos-react-core";

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import handleEvent from "./event-utils";
import StyledHanoverEfoLibraryDisplayToggleWrapper from './styles';

// interface for props
interface HanoverEfoLibraryDisplayToggleProps extends PConnFieldProps {
  variant?: 'inline' | 'stacked';
  caption: string;
  trueLabel: string;
  falseLabel: string;
}

// interface for StateProps object
interface StateProps {
  value: string;
}

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function HanoverEfoLibraryDisplayToggle(props: HanoverEfoLibraryDisplayToggleProps) {
  const {
    getPConnect,
    value = false,
    label = '',
    helperText = '',
    caption,
    validatemessage,
    hideLabel,
    testId,
    additionalProps = {},
    displayMode,
    variant = 'inline',
    trueLabel,
    falseLabel
  } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const status: "error" | "success" | "warning" | "pending" | undefined = validatemessage ? "error" : undefined;

  const inlineLabel = hideLabel ? '' : (label || caption);

  const aCosmosSwitch = (
    <CosmosSwitch
      {...additionalProps}
      on={value}
      label={inlineLabel}
      disabled={disabled}
      onChange={(event) => {
        handleEvent(actions, "changeNblur", propName, event.target.checked);
      }}
      data-testid={testId}
    />
  );

  const parentTestId = testId ? `${testId}-parent` : 'display-toggle-parent';

  const displayComponent = <BooleanDisplay value={value} trueLabel={trueLabel} falseLabel={falseLabel} />;

  if (displayMode === 'DISPLAY_ONLY') {
    return (
      <StyledHanoverEfoLibraryDisplayToggleWrapper>
       {displayComponent}
      </StyledHanoverEfoLibraryDisplayToggleWrapper>
    );
  }

  if (displayMode === "LABELS_LEFT") {
    return (
      <StyledHanoverEfoLibraryDisplayToggleWrapper>
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : caption, value: displayComponent }]}
      />
     </StyledHanoverEfoLibraryDisplayToggleWrapper>
    );
  }

  if (displayMode === "STACKED_LARGE_VAL") {
    return (
      <StyledHanoverEfoLibraryDisplayToggleWrapper>
      <FieldValueList
        variant='stacked'
        data-testid={testId}
        fields={[
          {
            id: '2',
            name: hideLabel ? '' : caption,
            value: (
              <Text variant='h1' as='span'>
                {displayComponent}
              </Text>
            )
          }
        ]}
      />
      </StyledHanoverEfoLibraryDisplayToggleWrapper>
    );
  }


  return (
    <StyledHanoverEfoLibraryDisplayToggleWrapper>
    <div className='display-toggle-shell'>
      <FormControl
        label={label}
        labelHidden
        data-testid={parentTestId}
        info={validatemessage || helperText}
        status={status}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        <div className='toggle-inline-box'>{aCosmosSwitch}</div>
      </FormControl>
    </div>
    </StyledHanoverEfoLibraryDisplayToggleWrapper>
  );


};


export default withConfiguration(HanoverEfoLibraryDisplayToggle);
