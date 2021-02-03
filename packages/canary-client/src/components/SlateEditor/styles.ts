import styled from "styled-components";

export const Wrapper = styled.div`
  && {
    .editor--content > div {
      min-height: 370px;
    }
  }

  & .editor--toolbar {
    background-color: rgba(0, 0, 0, 0.5);
  }
  & .editor--toolbar > * {
    display: inline-block;
  }
  & .editor--toolbar .btn,
  .editor--toolbar .select,
  .editor--toolbar .input {
    min-height: 50px;
    background: none;
    border: none;
  }
  & .editor--toolbar .select,
  .editor--toolbar .input {
    border: 1px solid #c7c7c7 !important;
  }
  & .editor--toolbar .select {
    max-width: 200px;
  }
  & .editor--toolbar .input {
    max-width: 100px;
  }

  & .editor--content.editable table {
    border: 1px solid black;
    border-collapse: collapse;
  }

  & .editor--content.editable table > tbody > tr {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  & .editor--content.editable table > tbody > tr > td {
    border-right: 1px solid black;
  }

  & .editor--content iframe {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default {
  button: {
    borderRight: "1px solid #fff",
  },
  dropdown: {
    position: "relative",
    top: 1,
    backgroundColor: "white",
    height: 38,
    paddingLeft: 20,
    border: "3px solid #0275d8",
    color: "#0275d8",
    margin: "0",
    WebkitAppearance: "none",
    padding: "0 10px 0 15px",
  },
  input: {
    position: "relative",
    top: 1,
    backgroundColor: "white",
    borderRadius: 0,
    height: 16,
    margin: 0,
    color: "#0275d8",
    border: "3px solid #0275d8",
  },
  toolbar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 5,
    display: "none",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 3,
    opacity: ".82",
    fontWeight: 300,
    fontSize: "2.15rem",
    cursor: "pointer",
    display: "none",
  },
};
