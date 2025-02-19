import styled from '@emotion/styled';

export default styled.div`
  background-color: limegreen;

  form {
    padding: 2em;
  }

  h2 {
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  label {
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    display:block;
    font-weight: 900;
    margin: 1.5em 0 1em;
  }

  input {
    cursor: pointer;
    border-radius: 2px;
    padding: 1rem;
    box-sizing: border-box;
    height: auto;
    border: 1px solid #eee;
    font-size: inherit;
    font-family: inherit;
    width: 100%;
  }

  div > span {
    color: #ff4136;
    font-weight: bold;
    background-color: #f9cace;
    padding: 0.5rem;
    border-radius: 0.188rem;
    display: block;
    margin-top: 0.9rem;
  }

  select {
    border-radius: 2px;
    padding: 1rem;
    display: inline-block;
    height: inherit;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #eee;
    font-family: inherit;
    font-size: inherit;
    width: 100%;
  }

  button[type=submit] {
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    padding: 1rem;
    width: 100%;
    border-radius: 3px;
    border: 1px solid transparent;
    text-transform: uppercase;
    letter-spacing: 0;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    line-height: 1.125rem;
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: pointer;
    margin: 2em 0 0 0;
  }
`
