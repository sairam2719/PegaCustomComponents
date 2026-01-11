export const configProps = {
  tooltip: 'Change',
  stepId: 'AssignmentSF1',
  text: 'Change',
  variant: 'link' as const,
  icon: false,
  iconName: 'plus'
};

export const fieldMetadata = {
  classID: 'DIXL-MediaCo-Work-NewService',
  type: 'Text',
  maxLength: 256,
  displayAs: 'pxURL',
  label: 'URL sample',
  validateAs: 'pxIsValidURL'
};

export const stateProps = {
  value: '.URLSample',
  hasSuggestions: false
};
