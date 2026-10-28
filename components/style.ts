// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0;
    width: 100%;

    .display-toggle-shell {
      width: fit-content;
      max-width: 100%;
      margin-left: auto;
    }

    .toggle-inline-box {
      border: 1px solid #d8dde6;
      border-radius: 6px;
      padding: 6px 10px;
      background: #fff;
      width: fit-content;
      max-width: 100%;
    }

    .toggle-inline-box label {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: fit-content;
      margin-left: auto;
      text-align: right;
    }

    @media (max-width: 768px) {
      .display-toggle-shell {
        max-width: 100%;
      }
    }
  `;
});
