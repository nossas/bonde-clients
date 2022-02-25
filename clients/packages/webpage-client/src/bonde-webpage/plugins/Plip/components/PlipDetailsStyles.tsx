import styled from '@emotion/styled';

const PlipDetailsStyles = styled.div`
  background-color: #ffffff;
  padding: 2em;
  border-radius: 3px;
  text-align: center;

  ol {
    text-align: left;
  }

  ol li{
    margin: 1em 0;
  }

  h3 {
    font-family: Nunito Sans;
    font-weight: 900;
    text-align: center;
  }

  button,
  a {
    display: inline-flex;
    text-transform: uppercase;
    font-size: small;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.5em;
    background-color: #EE0090;
    color: #FFF;
    border-radius: 0.3rem;
    text-decoration: none;
    padding: 1.3em;
    max-width: 13.5rem;
    margin: 20px;
    font-family: Arial;
    border: none;
  }

  a > svg {
    margin-right: 0.5rem;
  }
`;

export default PlipDetailsStyles;