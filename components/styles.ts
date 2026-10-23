import styled, { css } from 'styled-components';

type WrapperProps = {
  $align: 'flex-start' | 'center' | 'flex-end';
  $fullWidth: boolean;
  $bg?: string;
  $color?: string;
  $radius?: string;
};

/* Layout + optional design overrides.
   Default = compact button (fit-content), left aligned, theme colors. */
export const StyledButtonWrapper = styled.div<WrapperProps>`
  display: flex;
  width: 100%;
  justify-content: ${({ $align }) => $align};

  button {
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
    flex: ${({ $fullWidth }) => ($fullWidth ? '1 1 auto' : '0 0 auto')};
    white-space: nowrap;
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

/* Wraps the whole field and positions it vertically inside its row/cell,
   the same way "Alignment" positions the button left / center / right.
   align-self works in a flex row and in a grid cell, so top | center | bottom
   place the field against the tallest neighbour (e.g. a Quote number input). */
export const StyledFieldWrapper = styled.div<{ $vAlign: 'flex-start' | 'center' | 'flex-end' }>`
  display: flex;
  flex-direction: column;
  align-self: ${({ $vAlign }) => $vAlign};
  min-width: 0;
`;
