import styled, { css } from 'styled-components';

/* Wrapper that aligns the button and applies optional design overrides.
   Transient props ($...) are not passed to the DOM. */
export const StyledButtonWrapper = styled.div<{
  $align: string;
  $fullWidth?: boolean;
  $bg?: string;
  $color?: string;
  $radius?: string;
}>`
  display: flex;
  justify-content: ${({ $align }) => $align};
  width: 100%;

  button {
    ${({ $fullWidth }) =>
      $fullWidth &&
      css`
        width: 100%;
        justify-content: center;
      `}
    ${({ $bg }) =>
      $bg &&
      css`
        background-color: ${$bg};
        border-color: ${$bg};
      `}
    ${({ $color }) =>
      $color &&
      css`
        color: ${$color};
      `}
    ${({ $radius }) =>
      $radius &&
      css`
        border-radius: ${$radius};
      `}
  }
`;

export default StyledButtonWrapper;
