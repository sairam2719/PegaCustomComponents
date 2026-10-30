import styled, { css } from 'styled-components';

interface WrapperProps {
  $align: string;
  $fullWidth: boolean;
  /** Only pass values already validated with CSS.supports (see safeCss in index.tsx) */
  $bg?: string;
  $color?: string;
  $radius?: string;
  $disabled?: boolean;
}

export const StyledButtonWrapper = styled.div<WrapperProps>(
  ({ $align, $fullWidth, $bg, $color, $radius, $disabled }) => css`
    display: ${$fullWidth ? 'flex' : 'inline-flex'};
    align-items: center;
    justify-content: ${$align};
    width: ${$fullWidth ? '100%' : 'auto'};
    max-width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    background: transparent;

    button {
      ${$fullWidth ? 'width: 100%;' : 'width: auto;'}
      max-width: 100%;
      ${$bg ? `background-color: ${$bg};` : ''}
      ${$bg ? `border-color: ${$bg};` : ''}
      ${$color ? `color: ${$color};` : ''}
      ${$radius ? `border-radius: ${$radius};` : ''}
    }

    /* Keep custom colors on hover/focus (Cosmos hover styles could override them) */
    ${$bg || $color
      ? css`
          button:hover:not(:disabled),
          button:focus-visible:not(:disabled) {
            ${$bg ? `background-color: ${$bg};` : ''}
            ${$bg ? `border-color: ${$bg};` : ''}
            ${$color ? `color: ${$color};` : ''}
            filter: brightness(0.92);
          }
        `
      : ''}

    /* Disabled (custom condition true): faded and greyed out, not clickable.
       Cosmos already fades a disabled button, so opacity is kept mild to avoid double fading. */
    ${$disabled
      ? css`
          opacity: 0.7;
          filter: grayscale(0.4);
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
