import styled from "@emotion/styled";


export const PhoneAreaStyled = styled.div`
  background-color: #fff;

  pre {
    padding: 1rem 2rem 0.5rem;
  }
`

export const TargetAreaStyled = styled.div`
  background-color: #eeeeee;
  padding: 15px 26px;
  font-family: inherit;

  .title {
    color: #4c4c4c;
    font-size: 0.8em;
    // margin: 0 0 12px 0;
    font-weight: 700;
  }

  .loading {
    display: block;
  }

  ul {
    overflow: auto;
    list-style-type: none;
    margin: 5px 0 5px 0;
    padding: 0 0 5px;
    display: flex;
    flex-direction: row;
  }

  li {
    cursor:pointer;
    font-size: 0.8rem;
    color: #222;
    font-weight: 700;
    background-color: #fff;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border-radius: 3px;
    min-width: 150px;
  }

  li.active {
    background-color: lightgray;
  }
`

export const FormControlStyled = styled.div`
  padding: 1rem 2rem 0.5rem;
  border-bottom: 1px solid #eee;
`

export const FormFooterAreaStyled = styled.div<{ color: string }>`
  padding: 1rem 2rem 0.5rem;

  button {
    background-color: ${props => props.color};
    border-color: ${props => props.color};
  }
`


export const HeadingStyled = styled.h2<{
  bgColor: string
}>`
  background-color: ${(props: any) => props.bgColor};
  font-family: inherit;
  color: #fff;
  display: grid;
  justify-items: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px 3px 0 0;
  font-weight: 400;
  text-align: center;
`


export const CounterAreaStyled = styled.div<{
  color: string
}>`
  font-family: inherit;
  box-shadow: rgb(227, 224, 227) 0px 15px 18px -10px inset;
  background-color: #fff;
  display: grid;
  justify-items: center;
  padding: 2rem;
  border-radius: 0 0 3px 3px;

  .count {
    font-weight: 300;
    font-size: 2.15rem;
    color: ${props => props.color};
  }
  .desc {
    font-weight: 700;
    font-size: 1.25rem;
  }
`