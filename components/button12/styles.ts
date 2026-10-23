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

/* Wraps the whole field. When there is no visible label we still render a real label
   (so it has exactly the same height as the labels of neighbouring inputs) but make it
   invisible. display: contents keeps the wrapper out of the form's layout. */
export const StyledFieldWrapper = styled.div<{ $ghostLabel: boolean }>`
  display: contents;

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
