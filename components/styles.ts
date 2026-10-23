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
   - $bottom: the field is pushed to the bottom of its row/cell (align-self: flex-end),
     so the button sits beside the input box of the neighbouring field (not beside its label).
   - $ghostLabel: keeps an invisible but real label row so the button lines up with the input line.
   - otherwise display: contents keeps the wrapper out of the layout. */
export const StyledFieldWrapper = styled.div<{ $ghostLabel: boolean; $bottom: boolean }>`
  ${({ $bottom }) =>
    $bottom
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          /* flex-end works in a flex row AND a grid cell: the field drops to the bottom of the row
             (level with the neighbouring input box) even if the row does not stretch its items */
          align-self: flex-end;
          margin-top: auto;
          min-width: 0;
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
