import styled, { css } from 'styled-components';

interface WrapperProps {
  $align: string;
  $fullWidth: boolean;
  $bg?: string;
  $color?: string;
  $radius?: string;
  $disabled?: boolean;
}

export const StyledButtonWrapper = styled.div<WrapperProps>(
  ({ $align, $fullWidth, $bg, $color, $radius, $disabled }) => css`
    display: flex;
    justify-content: ${$align};
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    background: transparent;

    button {
      ${$fullWidth ? 'width: 100%;' : ''}
      ${$bg ? `background-color: ${$bg};` : ''}
      ${$bg ? `border-color: ${$bg};` : ''}
      ${$color ? `color: ${$color};` : ''}
      ${$radius ? `border-radius: ${$radius};` : ''}
    }

    /* Disabled (custom condition true): faded + blurred, not clickable */
    ${$disabled
      ? css`
          opacity: 0.5;
          filter: blur(0.6px) grayscale(0.4);
          cursor: not-allowed;

          button {
            pointer-events: none;
            cursor: not-allowed;
          }
        `
      : ''}
  `
);

export default StyledButtonWrapper;
