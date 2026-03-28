import { withConfiguration, Flex, Button } from '@pega/cosmos-react-core';
import './create-nonce';

type SlDxExtensionsPegaExtensionsActionableButtonProps = {
  label: string;
  value: string;
  localAction?: string;
  url?: string;
  getPConnect: any;
};

export const SlDxExtensionsPegaExtensionsActionableButton = (
  props: SlDxExtensionsPegaExtensionsActionableButtonProps
) => {
  const { getPConnect, label, value, localAction, url } = props;

  if (value && localAction) {
    const launchLocalAction = () => {
      const actionsAPI = getPConnect().getActionsApi();
      actionsAPI.openLocalAction(localAction, {
        caseID: value,
        containerName: 'modal',
        type: 'express'
      });
    };

    return (
      <Flex container={{ direction: 'row' }}>
        <Button onClick={launchLocalAction}>{label}</Button>
      </Flex>
    );
  }

  if (url) {
    const openUrl = () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
      <Flex container={{ direction: 'row' }}>
        <Button onClick={openUrl}>{label}</Button>
      </Flex>
    );
  }

  return null;
};

export default withConfiguration(SlDxExtensionsPegaExtensionsActionableButton);
