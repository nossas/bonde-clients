import styled from "@emotion/styled";

const HeaderWrap = styled.div`
  display: grid;
  align-items: center;
  width: 50%;
  @media (min-width: 370px) {
    justify-content: space-between;
    grid-template-columns: auto auto;
  }
  & > button {
    padding: 12px 20px;
  }
  & > a {
    font-weight: 800;
  }
  margin-bottom: 30px;
`;

export default HeaderWrap;
