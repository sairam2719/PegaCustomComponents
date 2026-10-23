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

/* Wraps the whole field.
   - $bottom: the field fills the height of its row/cell and pushes the button to the bottom,
     so it sits beside the input box of the neighbouring field (not beside its label).
   - $ghostLabel: keeps an invisible but real label row so the button lines up with the input line.
   - otherwise display: contents keeps the wrapper out of the layout. */
export const StyledFieldWrapper = styled.div<{ $ghostLabel: boolean; $bottom: boolean }>`
  ${({ $bottom }) =>
    $bottom
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-self: stretch;
          height: 100%;
          width: 100%;
        `
      : css`
          display: contents;
        `}

  ${({ $ghostLabel }) =>
    $ghostLabel &&
    css`
      label,
      legend {
        visibility: hidden;
        white-space: nowrap;
        overflow: hidden;
      }
    `}
`;
