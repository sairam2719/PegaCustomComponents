import styled, { css } from 'styled-components';

interface WrapperProps {
  $align: string;
  $bg?: string;
  $color?: string;
  $radius?: string;
  $disabled?: boolean;
}

export const StyledButtonWrapper = styled.div<WrapperProps>(
  ({ $align, $bg, $color, $radius, $disabled }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: ${$align};
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    background: transparent;

    button {
      width: fit-content;
      max-width: 100%;
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
