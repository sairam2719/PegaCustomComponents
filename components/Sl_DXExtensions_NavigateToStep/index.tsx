import { Button, Icon, registerIcon, withConfiguration } from '@pega/cosmos-react-core';
import * as pencil from '@pega/cosmos-react-core/lib/components/Icon/icons/pencil.icon';
import * as arrowBendLeft from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-bend-left.icon';
import * as arrowBendRight from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-bend-right.icon';
import * as check from '@pega/cosmos-react-core/lib/components/Icon/icons/check.icon';
import * as undo from '@pega/cosmos-react-core/lib/components/Icon/icons/undo.icon';
import * as plus from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledSlDxExtensionsNavigateToStepWrapper from './styles';

registerIcon(pencil, arrowBendLeft, arrowBendRight, check, undo, plus);
// interface for props
export interface SlDxExtensionsNavigateToStepProps extends PConnFieldProps {
  text: string;
  stepID: string;
  tooltip?: string;
  variant?: 'link' | 'simple' | 'text';
  compact?: boolean;
  icon?: boolean;
  iconName?: 'pencil' | 'arrow-bend-left' | 'arrow-bend-right' | 'check' | 'undo' | 'plus';
}

function SlDxExtensionsNavigateToStep({
  getPConnect,
  text = 'Edit',
  stepID,
  tooltip = 'Navigate to step',
  variant = 'link',
  compact = false,
  icon = false,
  iconName = 'pencil',
  disabled = false,
  testId = 'NavigateToStep'
}: Readonly<SlDxExtensionsNavigateToStepProps>) {
  const actions = getPConnect().getActionsApi();
  return (
    <StyledSlDxExtensionsNavigateToStepWrapper>
      <Button
        data-testid={testId}
        name={stepID}
        label={tooltip || text}
        compact={compact}
        disabled={disabled}
        variant={variant}
        icon={icon}
        onClick={() => actions.navigateToStep(stepID, getPConnect().getContextName())}
      >       
        {iconName && <Icon name={iconName} />}
        {!icon ? text : undefined}
      </Button>
    </StyledSlDxExtensionsNavigateToStepWrapper>
  );
}

export default withConfiguration(SlDxExtensionsNavigateToStep);