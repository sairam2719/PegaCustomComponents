import { PConnect } from '@pega/pcore-pconnect-typedefs';

// Every Constellation DX component receives getPConnect
export interface PConnProps {
  getPConnect: () => typeof PConnect;
}

// Common props for field components
export interface PConnFieldProps extends PConnProps {
  label: string;
  required: boolean;
  disabled: boolean;
  value: any;
  validatemessage: string;
  status?: string;
  onChange?: any;
  onBlur?: any;
  readOnly: boolean;
  testId: string;
  helperText: string;
  displayMode?: string;
  hideLabel: boolean;
  placeholder?: string;
  fieldMetadata?: any;
  additionalProps?: any;
}
