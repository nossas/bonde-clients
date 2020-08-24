import styled from 'styled-components';

const LanguageTool = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 15px;
  right: 15px;

  button {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    margin-left: 5px;
    opacity: 0.3;

    &.active {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export default LanguageTool;