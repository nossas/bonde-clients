import styled from 'styled-components'

const ResponsiveUI = styled.div`
  display: flex;
  flex-grow: 1;

  .xs-6 {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    flex-grow: 1;
    padding: 20px 60px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .xs-6 > div {
    width: calc(50% - 20px);
  }

  @media only screen and (max-width: 768px) {
    .xs-6 {
      flex-direction: column;
      padding: 20px 30px;
    }

    .xs-6 > div {
      width: 100%;

      padding: 0 0 30px;
    }

    .hide-xs {
      display: none;
    }
  }
`

export default ResponsiveUI
